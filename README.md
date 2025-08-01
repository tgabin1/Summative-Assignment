# 🇷🇼 Explore Rwanda

> Discover the heart of Africa – nature, culture, and heritage

A beautifully crafted web application that helps users discover and plan trips to amazing places in Rwanda. Built with authentic Rwandan design elements inspired by traditional Imigongo art patterns and showcasing the natural beauty of Rwanda's landscapes.

## ✨ Features

### 🗺️ **Interactive Map**
- Dynamic Leaflet.js map with smooth animations
- Real-time location search and geocoding
- Custom markers for discovered places
- Responsive zoom and pan controls

### 🌤️ **Weather Integration**
- Live weather data for searched locations
- Beautiful weather icons with emoji representations
- Temperature, humidity, and weather descriptions
- Powered by OpenWeatherMap API

### 📍 **Place Discovery**
- **Hotels** 🏨 - Find comfortable accommodations
- **Restaurants** 🍽️ - Discover local cuisine
- **Cultural Centers** 🎭 - Explore Rwanda's rich culture
- **Memorials** 🕊️ - Visit important historical sites
- **National Parks** 🌳 - Experience Rwanda's natural beauty

### 📝 **Trip Planner**
- Add places to your personal trip itinerary
- Remove unwanted locations
- Clear entire trip with one click
- Persistent trip management during session

### 🎨 **Authentic Design**
- **Imigongo Art Patterns** - Traditional Rwandan geometric designs
- **Authentic Color Palette** - Earth tones inspired by Rwandan clay and nature
- **Dark/Light Theme** - Toggle between themes with smooth transitions
- **Responsive Design** - Works perfectly on all devices

### 🔍 **Smart Search**
- Location-based geocoding
- Real-time place filtering
- Intuitive search interface
- Keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Modern web browser
- Internet connection for API services

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd explore-rwanda
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - **Load Balancer**: http://localhost:8080
   - **Web Instance 1**: http://localhost:8081
   - **Web Instance 2**: http://localhost:8082

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   Docker Compose│
│   (nginx:8080)  │◄───┤   Orchestration │
└─────────┬───────┘    └─────────────────┘
          │
          ▼
    ┌─────────────┐
    │  Upstream   │
    │  Backends   │
    └─────┬───────┘
          │
    ┌─────▼─────┬─────────────┐
    │           │             │
┌───▼───┐   ┌──▼────┐    ┌───▼────┐
│ web01 │   │ web02 │    │  ...   │
│:8081  │   │:8082  │    │ :808X  │
└───────┘   └───────┘    └────────┘
```

### Load Balancing
- **Nginx** upstream configuration
- **Round-robin** distribution
- **High availability** with multiple instances
- **Scalable** architecture

## 📁 Project Structure

```
explore-rwanda/
├── 📄 index.html              # Main HTML structure
├── 🎨 styles.css              # Imigongo-inspired styling
├── ⚡ script.js               # Core JavaScript functionality
├── 🐳 Dockerfile              # Container configuration
├── 🔧 docker-compose.yml      # Multi-service orchestration
├── ⚙️ nginx.conf              # Load balancer configuration
├── 🚫 .gitignore              # Git ignore patterns
└── 📖 README.md               # This file
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Advanced animations and responsive design
- **Vanilla JavaScript** - ES6+ features for modern functionality
- **Leaflet.js** - Interactive mapping library

### APIs & Services
- **OpenWeatherMap API** - Real-time weather data
- **Geoapify API** - Geocoding and places search
- **OpenStreetMap** - Map tiles and geographical data

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server and load balancer
- **Alpine Linux** - Lightweight container base

## 🔧 Configuration

### API Keys
The application uses the following APIs (keys are included for demo purposes):

```javascript
const openWeatherApiKey = "d36dd112c52fd3820162c9ca625f70e5";
const geoapifyApiKey = "51c0df0155be43919d9626f139b1ac27";
const geoapifyGeoKey = "9679c7404c6c4c978948b981efc0f208";
```

### Environment Variables
For production deployment, consider moving API keys to environment variables:

```bash
# .env file
OPENWEATHER_API_KEY=your_openweather_key
GEOAPIFY_API_KEY=your_geoapify_key
GEOAPIFY_GEO_KEY=your_geoapify_geo_key
```

## 🎯 Usage Guide

### 1. **Search for a Location**
   - Enter any location in Rwanda (e.g., "Kigali", "Musanze")
   - Click "Search" or press Enter
   - View weather information and map location

### 2. **Discover Places**
   - Click category buttons to find specific types of places
   - Browse through the beautifully styled place cards
   - Use the search filter to narrow results

### 3. **Plan Your Trip**
   - Click "Add to Trip" on interesting places
   - Manage your itinerary in the trip planner section
   - Remove places or clear the entire trip as needed

### 4. **Customize Experience**
   - Toggle between light and dark themes
   - Enjoy smooth animations and transitions
   - Experience the authentic Rwandan design aesthetic

## 🔒 Security Considerations

- API keys are exposed in client-side code (suitable for demo/development)
- For production, implement server-side proxy for API calls
- Consider rate limiting and API key rotation
- Implement HTTPS in production environments

## 🌍 Cultural Significance

This application celebrates Rwanda's rich cultural heritage:

- **Imigongo Art**: Traditional geometric patterns used throughout the design
- **Color Palette**: Inspired by Rwanda's natural clay and earth tones
- **Typography**: Clean, modern fonts that complement traditional elements
- **Photography**: Authentic Rwandan landscapes in the background imagery

## 🚀 Deployment

### Development
```bash
# Simple local development
python -m http.server 8000
# or
npx serve .
```

### Production with Docker
```bash
# Build and deploy
docker-compose up -d --build

# Scale services
docker-compose up -d --scale web01=3 --scale web02=2

# View logs
docker-compose logs -f
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Rwanda Development Board** - For tourism inspiration
- **Imigongo Artists** - For the beautiful traditional art patterns
- **OpenStreetMap Contributors** - For the mapping data
- **Leaflet.js Community** - For the excellent mapping library

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation and FAQ

---

**Built with ❤️ in Rwanda | Inspired by authentic Imigongo art and Rwandan landscapes**

*Explore Rwanda - Discover the Land of a Thousand Hills* 🏔️