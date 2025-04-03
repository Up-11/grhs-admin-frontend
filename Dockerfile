# Базовый образ
FROM node:18-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --production=false

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-i18next.config.js ./

EXPOSE 3000

CMD ["npm", "start"]
