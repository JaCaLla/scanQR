# Base image for Node.js
FROM node:14

# Create and fix working dirctory
WORKDIR /usr/src/app

# Copy application files
COPY . .

# Install dependencies
RUN npm install

# Expose appliction port
EXPOSE 3000

# Command for starting server application
CMD ["node", "server.js"]