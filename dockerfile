# Use official Nginx as the base image
FROM nginx:alpine

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all files into the nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
