# ===== DEVELOPMENT STAGE =====
FROM node:18-alpine as dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
# Dev mode with auto-restart
CMD ["node", "index.js"]  

# ===== PRODUCTION STAGE =====
FROM node:18-alpine as prod

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 4000
CMD ["node", "index.js"]  
# Production start