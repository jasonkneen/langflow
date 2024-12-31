FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-progress

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY package*.json ./
RUN npm ci --production --no-audit --no-progress && npm cache clean --force

ENV PORT=5173
EXPOSE 5173

CMD ["npm", "run", "serve"]
