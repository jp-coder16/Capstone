FROM node:18

WORKDIR /app

# Improve npm stability in Docker
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Copy dependencies first (better caching)
COPY package*.json ./

# Stable install (important fix)
RUN npm install --no-audit --no-fund --legacy-peer-deps

# Copy full project
COPY . .

EXPOSE 5000

CMD ["npm", "start"]