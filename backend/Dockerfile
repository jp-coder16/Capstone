FROM node:18-alpine

WORKDIR /app

# ---- dependencies first (cache layer) ----
COPY package*.json ./

RUN npm ci --only=production

# ---- app code ----
COPY . .

EXPOSE 5000

CMD ["npm", "start"]