# Use the official Node.js image as a base
FROM node:latest
# Set the working directory in the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
# to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of your application code
COPY . .

# build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000 

# Set environment variables if needed
# ENV NODE_ENV=production

# Start the application
CMD [ "npm", "start" ]