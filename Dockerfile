# Use the official Node.js image as a build environment
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN npm run build

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Set the label for the image source
LABEL org.opencontainers.image.source=https://github.com/CynicDog/spa-spring-keycloak-oauth2

# Expose port 8880
EXPOSE 8880

# Start Nginx and run it in the foreground
CMD ["nginx", "-g", "daemon off;"]
