# Stage 1: Build the Next.js application
FROM node:current-alpine3.19 AS build

WORKDIR /app/client

COPY package*.json ./
RUN npm install --force

COPY . .

RUN npm run build

# Stage 2: Run the Next.js application
FROM node:current-alpine3.19


ENV NODE_ENV production

WORKDIR /app

COPY --from=build /app/client/next.config.mjs ./
COPY --from=build /app/client/.env.production ./
COPY --from=build /app/client/public ./public
COPY --from=build /app/client/.next ./.next
COPY --from=build /app/client/node_modules ./node_modules
COPY --from=build /app/client/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
