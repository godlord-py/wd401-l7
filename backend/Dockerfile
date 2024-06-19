# Use the official Node.js image as the base image
FROM node:14
WORKDIR /app
# Copy package.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .
# Expose the port the app runs on
EXPOSE 5000
# Start the application
CMD ["node", "index.js"]
