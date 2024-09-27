# Use the official Node.js image as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ARG PORT=4173
ARG GITHUB_LOGIN_URL
ARG AZURE_LOGIN_URL

ENV PORT=$PORT
ENV VITE_GITHUB_LOGIN_URL=$GITHUB_LOGIN_URL
ENV VITE_AZURE_LOGIN_URL=$AZURE_LOGIN_URL

# Expose port 5173
EXPOSE $PORT

# Command to run the application
CMD ["npm", "run", "preview", "--host"]