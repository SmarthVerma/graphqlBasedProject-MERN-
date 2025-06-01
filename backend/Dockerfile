FROM node:18-alpine

WORKDIR /app

# Copy package.json if it includes backend dependencies
COPY ./package*.json ./
RUN npm install

# Copy only backend source code
COPY . .

EXPOSE 4000
CMD ["node", "index.js"]  # Adjust to your actual backend entry file