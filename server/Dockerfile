# Stage 1: Base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Development (Hot Reload) 
FROM base AS development
# We don't COPY . here because docker-compose will mount the volume
CMD ["npm", "run", "dev"]

#  Stage 3: Production 
FROM base AS production
COPY . .
RUN npm prune --production
CMD ["node", "server.js"]