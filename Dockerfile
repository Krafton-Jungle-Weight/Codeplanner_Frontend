# ==================================
# 1. 빌드(Build) 단계
# ==================================
# Node.js 22 버전을 빌드 환경으로 사용합니다.
FROM node:22-alpine AS builder

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사합니다.
COPY package*.json ./
RUN npm install

# 나머지 소스 코드를 복사합니다.
COPY . .

# ====================================================
# ↓↓↓↓↓ 이 부분을 빌드 단계로 옮깁니다 ↓↓↓↓↓
# 빌드 시 외부에서 NEXT_PUBLIC_API_URL 값을 받을 수 있도록 ARG를 선언합니다.
ARG NEXT_PUBLIC_API_URL
# 받은 ARG 값을 빌드 과정에서 사용할 환경 변수로 설정합니다.
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# ====================================================

# Next.js 애플리케이션을 빌드합니다. (이제 진짜 주소를 알고 있습니다)
RUN npm run build

# ==================================
# 2. 실행(Runner) 단계
# ==================================
# 빌드 단계와 별개로, 더 가벼운 이미지에서 시작합니다.
FROM node:18-alpine

WORKDIR /app

# 빌드 단계에서 생성된 파일들만 가져옵니다.
# 1. 빌드 결과물 (.next 폴더)
COPY --from=builder /app/.next ./.next
# 2. 정적 파일 (public 폴더)
COPY --from=builder /app/public ./public
# 3. 실행에 필요한 파일들
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# 3000번 포트를 외부에 노출합니다.
EXPOSE 3000

# 애플리케이션을 실행하는 명령어를 설정합니다.
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
