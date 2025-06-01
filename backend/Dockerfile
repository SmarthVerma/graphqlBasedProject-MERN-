FROM node:18-alpine

WORKDIR /app

# Install nodemon globally for development
RUN npm install -g nodemon

COPY package*.json ./
RUN npm install

# Copy the rest (in development, this will be overridden by the bind mount)
COPY . .

EXPOSE 4000

# Use nodemon to watch for changes
CMD ["nodemon", "index.js"]