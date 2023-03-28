# Use the official Node.js 16 image as the base image
FROM node:16

# Create app directory
WORKDIR /movielix

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Set the APP_PORT environment variable to 8050
ENV APP_PORT=8050

# Expose the port specified by the APP_PORT environment variable
EXPOSE $APP_PORT

# Start the application
CMD [ "npm", "start" ]
