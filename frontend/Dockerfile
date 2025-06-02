# ===== DEVELOPMENT STAGE =====
FROM node:18-alpine as dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173
# Runs Vite on port 5173
CMD ["npm", "run", "dev"]  

# ===== PRODUCTION BUILD STAGE =====
FROM node:18-slim as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Outputs to /app/dist
RUN echo "=== npm run build starting ===" && npm run build
# ===== PRODUCTION SERVE STAGE (NGINX) =====
FROM nginx:alpine as prod

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]