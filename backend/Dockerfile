FROM node:18

WORKDIR /app

# Copy ONLY dependency files first (critical for caching)
COPY package*.json ./

# Install dependencies (cached layer)
RUN npm install --no-audit --no-fund --legacy-peer-deps

# Copy rest of the code AFTER dependencies
COPY . .

EXPOSE 5000

CMD ["npm", "start"]