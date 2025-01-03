FROM node:22.11.0

# Set working directory inside the container
WORKDIR /usr/code

# Copy the package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the project files
COPY . .

# Set default value for SERVER_PORT (example: 3000)
ENV SERVER_PORT=3000

# Expose the port defined by SERVER_PORT environment variable
EXPOSE $SERVER_PORT

# Command to run the app in production mode
CMD ["npm", "run", "start:prod"]
