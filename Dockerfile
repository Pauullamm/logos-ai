# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory to the current directory (where Dockerfile is located)
WORKDIR /server

# Copy package.json and package-lock.json first (if available) to optimize caching
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy all other files (including server.js)
COPY server ./

# Expose the port your app runs on
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
