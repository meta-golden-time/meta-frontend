# Node.js 20 버전 사용
FROM node:20 AS builder
WORKDIR /app

# 패키지 설치 및 동기화
COPY package*.json ./
COPY yarn.lock ./
RUN rm -f package-lock.json && yarn install

# 나머지 파일 복사 및 빌드
COPY . .
RUN yarn build

# Production 런타임
FROM nginxinc/nginx-unprivileged:1.23 AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
