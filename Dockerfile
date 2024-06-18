# Build stage
FROM node:latest AS build
WORKDIR /app

# 패키지 설치
COPY package.json yarn.lock ./
RUN yarn install

# 애플리케이션 소스 복사 및 빌드
COPY . .
RUN yarn build

# Production stage
FROM node:latest
WORKDIR /app

# 빌드 결과물 복사
COPY --from=build /app/dist ./dist

# `serve` 설치 및 포트 노출
RUN yarn global add serve
EXPOSE 80

# `serve`를 사용하여 정적 파일 제공
CMD ["serve", "-s", "dist", "-l", "80"]
