const openWeatherApiKey = "d36dd112c52fd3820162c9ca625f70e5";
const geoapifyApiKey = "51c0df0155be43919d9626f139b1ac27";
const geoapifyGeoKey = "9679c7404c6c4c978948b981efc0f208";

let map;
let markers = [];
let trip = [];

function smoothZoomTo(lat, lon, zoom = 12) {
  if (!map) return;
  map.flyTo([lat, lon], zoom, { animate: true, duration: 1.5 });
}

function initMap(lat = -1.9577, lon = 30.1127) {
  if (!map) {
    map = L.map("map").setView([lat, lon], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  } else {
    smoothZoomTo(lat, lon, 12);
  }
}

function clearMarkers() {
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];
}

async function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather fetch failed");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    document.getElementById("weather").innerHTML = "<p>Error fetching weather data.</p>";
    console.error(err);
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");
  const description = data.weather[0].description.toLowerCase();
  const emoji = getWeatherEmoji(description);

  weatherDiv.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>${emoji} ${data.weather[0].description}, Temp: ${data.main.temp}°C, Humidity: ${data.main.humidity}%</p>
  `;
}

function getWeatherEmoji(desc) {
  if (desc.includes("clear")) return "☀️";
  if (desc.includes("cloud")) return "☁️";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("thunderstorm")) return "⛈️";
  if (desc.includes("snow")) return "❄️";
  if (desc.includes("mist") || desc.includes("fog")) return "🌫️";
  return "🌍";
}

async function geocodeLocation(location) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${geoapifyGeoKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Geocoding failed");
    const data = await res.json();
    if (data.features && data.features.length > 0) {
      const { lat, lon } = data.features[0].properties;
      return { lat, lon };
    } else {
      throw new Error("No results found");
    }
  } catch (err) {
    alert("Location not found, please try another input.");
    console.error(err);
    return null;
  }
}

function filterPlaces(keyword) {
  const placesDiv = document.getElementById("places");
  const lowerKeyword = keyword.toLowerCase();

  markers.forEach((marker) => {
    const popupText = marker.getPopup().getContent().toLowerCase();
    if (popupText.includes(lowerKeyword)) {
      marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });

  Array.from(placesDiv.children).forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(lowerKeyword) ? "" : "none";
  });
}

async function fetchPlaces(category) {
  const locationInput = document.getElementById("locationInput").value.trim();
  if (!locationInput) {
    alert("Please enter a location first.");
    return;
  }
  const coords = await geocodeLocation(locationInput);
  if (!coords) return;

  clearMarkers();
  initMap(coords.lat, coords.lon);
  fetchWeather(coords.lat, coords.lon);

  document.querySelector(".places-search-container").style.display = "block";
  const placesSearchInput = document.getElementById("placesSearchInput");
  placesSearchInput.value = "";
  placesSearchInput.focus();

  const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${coords.lon},${coords.lat},5000&limit=15&apiKey=${geoapifyApiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Places fetch failed");
    const data = await res.json();
    displayPlaces(data.features);
  } catch (err) {
    document.getElementById("places").innerHTML = "<p>Error fetching places data.</p>";
    console.error(err);
  }
}

function displayPlaces(features) {
  const placesDiv = document.getElementById("places");
  placesDiv.innerHTML = "";
  if (features.length === 0) {
    placesDiv.innerHTML = "<p>No places found for this category.</p>";
    return;
  }

  features.forEach((feature, i) => {
    const { lat, lon } = feature.properties;
    const name = feature.properties.name || "Unnamed";
    const address = feature.properties.formatted || "No address available";

    const marker = L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`<b>${name}</b><br>${address}`);
    markers.push(marker);

    const card = document.createElement("div");
    card.className = "place-card";
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <h3>${name}</h3>
      <p>${address}</p>
      <button class="add-trip-btn" aria-label="Add ${name} to trip">+ Add to Trip</button>
    `;
    placesDiv.appendChild(card);

    card.querySelector(".add-trip-btn").addEventListener("click", () => {
      addToTrip({ name, address, lat, lon });
    });
  });
}

async function searchLocation() {
  const locationInput = document.getElementById("locationInput").value.trim();
  if (!locationInput) {
    alert("Please enter a location to search.");
    return;
  }
  const coords = await geocodeLocation(locationInput);
  if (!coords) return;
  clearMarkers();
  initMap(coords.lat, coords.lon);
  fetchWeather(coords.lat, coords.lon);
  document.getElementById("places").innerHTML = "";
  document.querySelector(".places-search-container").style.display = "none";
  document.getElementById("placesSearchInput").value = "";
}

function addToTrip(place) {
  if (trip.some((p) => p.name === place.name && p.address === place.address)) {
    alert("This place is already in your trip.");
    return;
  }
  trip.push(place);
  renderTrip();
}

function removeFromTrip(index) {
  trip.splice(index, 1);
  renderTrip();
}

function clearTrip() {
  if (confirm("Clear all places from your trip?")) {
    trip = [];
    renderTrip();
  }
}

function renderTrip() {
  const tripList = document.getElementById("tripList");
  tripList.innerHTML = "";

  if (trip.length === 0) {
    tripList.innerHTML = "<p>Your trip is empty. Add places from the list above.</p>";
    return;
  }

  trip.forEach((place, i) => {
    const div = document.createElement("div");
    div.className = "trip-item";
    div.innerHTML = `
      <span>${place.name}</span>
      <button class="remove-trip-btn" aria-label="Remove ${place.name} from trip">&times;</button>
    `;
    tripList.appendChild(div);

    div.querySelector(".remove-trip-btn").addEventListener("click", () => {
      removeFromTrip(i);
    });
  });
}

// Event listeners
document.getElementById("placesSearchInput").addEventListener("input", (e) => {
  filterPlaces(e.target.value);
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("locationInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") searchLocation();
});

document.getElementById("clearTripBtn").addEventListener("click", clearTrip);

// On load
window.onload = () => {
  initMap();
  fetchWeather(-1.9577, 30.1127);
  renderTrip();
};

// Update footer with dynamic year
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("footerText");
  const year = new Date().getFullYear();
  footer.textContent = `Built with ❤️ in Rwanda | Inspired by authentic Imigongo art and Rwandan landscapes | Rwanda - © ${year} Explore Rwanda`;
});
