# Use an official Node runtime as a parent image
FROM node:18-alpine

# Copy package files and install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 8080

# Start the server
CMD ["node", "./server.js"]

