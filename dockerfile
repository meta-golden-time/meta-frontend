# Build stage
FROM node:latest AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
RUN npm run build
FROM node:latest
WORKDIR /app
COPY --from=build /app/dist ./dist
EXPOSE 80
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "80"]