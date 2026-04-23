FROM node:18 AS build

WORKDIR /app

# Step 1: install dependencies (cached layer)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Step 2: copy source
COPY . .

# Step 3: build
RUN npm run build


# ---- Production stage (lightweight) ----
FROM node:18-alpine

WORKDIR /app

# Install only serve (light)
RUN npm install -g serve

# Copy only build output
COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]