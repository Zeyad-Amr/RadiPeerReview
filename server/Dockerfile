# Stage 1: Build the application
FROM node:22.3.0-alpine3.19 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Rebuild native modules for the container's architecture
RUN npm rebuild bcrypt

# Generate Prisma client
RUN npx prisma generate

RUN npm run build

# Stage 2: Run the application
FROM node:22.3.0-alpine3.19

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/initDB ./initDB
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Create the upload directory
RUN mkdir -p ./dist/upload

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node initDB/app && node dist/main"]
