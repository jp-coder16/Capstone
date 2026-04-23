# -------- BUILD STAGE --------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


# -------- PRODUCTION STAGE --------
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

# VITE OUTPUT FIX
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]