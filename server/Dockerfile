FROM node:18-alpine

WORKDIR /app

# 패키지 파일 복사 및 모든 의존성 설치 (빌드에 devDependencies 필요)
COPY package*.json ./
RUN npm ci

# 소스 코드 복사
COPY . .

# TypeScript 빌드
RUN npm run build

# 프로덕션 의존성만 다시 설치 (이미지 크기 최적화)
RUN npm ci --only=production && npm cache clean --force

# 포트 노출
EXPOSE 5001

# 서버 실행
CMD ["npm", "start"]

