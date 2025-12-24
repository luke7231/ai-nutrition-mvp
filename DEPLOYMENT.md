# 배포 가이드

이 프로젝트는 Vercel(프론트엔드)과 Cloudtype(백엔드)을 사용하여 배포합니다.

## 배포 구조

- **프론트엔드 (Client)**: Vercel
- **백엔드 (Server)**: Cloudtype

## 1. 백엔드 배포 (Cloudtype)

### 1.1 Cloudtype 프로젝트 생성

1. [Cloudtype](https://cloudtype.io)에 로그인
2. 새 프로젝트 생성
3. Docker 이미지 배포 선택

### 1.2 환경 변수 설정

Cloudtype 대시보드에서 다음 환경 변수를 설정합니다:

```
PORT=5001
OPENAI_API_KEY=your_openai_api_key_here
```

### 1.3 배포 설정

- **빌드 명령어**: `npm run build`
- **실행 명령어**: `npm start`
- **포트**: `5001`
- **Dockerfile 경로**: `server/Dockerfile`

### 1.4 배포 실행

1. Cloudtype에서 Git 저장소 연결
2. 빌드 및 배포 자동 실행
3. 배포 완료 후 백엔드 URL 확인 (예: `https://your-app.cloudtype.app`)

## 2. 프론트엔드 배포 (Vercel)

### 2.1 Vercel 프로젝트 생성

1. [Vercel](https://vercel.com)에 로그인
2. 새 프로젝트 생성
3. Git 저장소 연결

### 2.2 프로젝트 설정

- **프레임워크**: Create React App
- **루트 디렉토리**: `client`
- **빌드 명령어**: `npm run build`
- **출력 디렉토리**: `build`

### 2.3 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정합니다:

```
REACT_APP_API_URL=https://your-backend-url.cloudtype.app
```

> ⚠️ **중요**: 백엔드 URL은 Cloudtype 배포 완료 후 확인한 실제 URL로 설정해야 합니다.

### 2.4 배포 실행

1. Vercel에서 Git 저장소 연결
2. 환경 변수 설정
3. 배포 자동 실행

## 3. 로컬 개발 환경 설정

### 3.1 백엔드

```bash
cd server
npm install
cp .env.example .env  # .env 파일 생성 후 OPENAI_API_KEY 설정
npm run dev
```

### 3.2 프론트엔드

```bash
cd client
npm install
npm start
```

프론트엔드는 기본적으로 `http://localhost:3000`에서 실행되며, `package.json`의 `proxy` 설정을 통해 백엔드(`http://localhost:5001`)와 통신합니다.

## 4. 배포 체크리스트

### 백엔드 (Cloudtype)
- [ ] Dockerfile 생성 완료
- [ ] package.json에 build, start 스크립트 추가 완료
- [ ] 환경 변수 설정 (PORT, OPENAI_API_KEY)
- [ ] 배포 후 백엔드 URL 확인

### 프론트엔드 (Vercel)
- [ ] vercel.json 설정 완료
- [ ] 환경 변수 설정 (REACT_APP_API_URL)
- [ ] 배포 후 프론트엔드 URL 확인
- [ ] API 통신 테스트

## 5. 트러블슈팅

### CORS 에러
백엔드에서 CORS 설정이 올바른지 확인하세요. `server/src/server.ts`에서 `app.use(cors())`가 설정되어 있어야 합니다.

### API 연결 실패
- 프론트엔드의 `REACT_APP_API_URL` 환경 변수가 올바른지 확인
- 백엔드 서버가 정상적으로 실행 중인지 확인
- 네트워크 탭에서 실제 요청 URL 확인

### 빌드 실패
- Node.js 버전 확인 (18 이상 권장)
- 의존성 설치 확인 (`npm install`)
- TypeScript 컴파일 에러 확인

## 6. 추가 참고사항

- 프로덕션 환경에서는 HTTPS를 사용해야 합니다
- 환경 변수는 절대 Git에 커밋하지 마세요
- `.env.example` 파일을 참고하여 환경 변수를 설정하세요

