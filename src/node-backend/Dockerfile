FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-progress && npm cache clean --force

COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["node", "index.js"]
