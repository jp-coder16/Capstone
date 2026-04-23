FROM node:18-alpine AS build

WORKDIR /app

# install deps first (cache layer)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

# build vite
RUN npm run build


# production stage (super light)
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

# FIX: Vite output is dist NOT build
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]