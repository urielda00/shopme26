# --- Stage 1: Base ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# --- Stage 2: Development ---
FROM base AS development
CMD ["npm", "run", "dev"]

# --- Stage 3: Build (For Production) ---
FROM base AS build-stage
COPY . .
RUN npm run build

# --- Stage 4: Production (Nginx) ---
FROM nginx:stable-alpine AS production
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]