# AI 영양사 - 맞춤형 영양제 추천 서비스

> 증상만 말하세요! 논문과 최고의 조합은 우리가 다 찾아놨어요.

15,000개 이상의 영양학 논문을 학습한 AI가 개인 맞춤형 영양제를 추천해주는 서비스입니다.

## 🚀 서비스 링크

**배포된 서비스**: [https://ai-nutrition-mvp.vercel.app](https://ai-nutrition-mvp.vercel.app)

## 🎯 프로젝트 개요

사용자의 나이, 성별, 증상을 입력받아 AI가 분석하고, 논문 기반의 과학적 근거를 바탕으로 최적의 영양제 조합을 추천합니다.

### 주요 기능

- **맞춤형 분석**: 나이, 성별, 증상 기반 개인화 추천
- **AI 기반 전략 생성**: OpenAI GPT-4를 활용한 지능형 분석
- **2가지 전략 제공**: Light (경량) / Full (종합) 전략 선택
- **성분별 용량 조정**: 사용자가 직접 성분별 섭취량 조정 가능
- **제품 번들 추천**: 예산대별 제품 조합 추천 (Budget/Standard/Premium)
- **실시간 학습 현황**: 논문 학습 통계 실시간 표시

## 🏗️ 기술 스택

### Frontend

- **React 18** + **TypeScript**
- **Create React App** (CRA)
- **Tailwind CSS** - Toss 스타일 미니멀 디자인
- **React Router** - SPA 라우팅
- **Axios** - HTTP 클라이언트

### Backend

- **Node.js** + **Express 5**
- **TypeScript**
- **OpenAI API** (GPT-4o-mini) - AI 분석 엔진
- **CORS** - Cross-Origin 리소스 공유

### 배포

- **Vercel** - 프론트엔드 배포
- **Cloudtype** - 백엔드 배포 (Docker)

### 데이터

- **JSON 파일 기반** - 데이터베이스 없이 파일 시스템 사용
- **정적 데이터**: 제품, 성분, 증상 데이터

## 📁 프로젝트 구조

```
ai-nutrition-mvp/
├── client/                 # 프론트엔드 (React)
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   │   ├── Home.tsx           # 홈 페이지
│   │   │   ├── AnalysisFlow.tsx   # 분석 플로우 (8단계)
│   │   │   ├── TargetSelection.tsx # 대상 선택
│   │   │   ├── ProfileInput.tsx    # 프로필 입력
│   │   │   ├── SymptomSuggestions.tsx # 증상 선택
│   │   │   ├── StrategySelection.tsx   # 전략 선택
│   │   │   ├── IngredientDosage.tsx   # 용량 조정
│   │   │   ├── FinalReport.tsx        # 최종 리포트
│   │   │   └── SetDetailPage.tsx      # 제품 상세
│   │   ├── api/            # API 클라이언트
│   │   └── App.tsx         # 메인 앱 (라우팅)
│   └── vercel.json         # Vercel 배포 설정
│
├── server/                 # 백엔드 (Express)
│   ├── src/
│   │   ├── server.ts       # Express 서버
│   │   ├── data/           # 데이터 파일
│   │   │   ├── products.ts      # 제품 데이터
│   │   │   ├── ingredients.ts   # 성분 카탈로그
│   │   │   └── symptoms.ts      # 증상 데이터
│   │   └── scripts/        # 유틸리티 스크립트
│   ├── Dockerfile          # Docker 이미지 빌드
│   └── cloudtype.yml       # Cloudtype 배포 설정
│
└── DEPLOYMENT.md           # 배포 가이드
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn
- OpenAI API Key (선택사항 - 없으면 더미 응답)

### 로컬 개발 환경 설정

#### 1. 저장소 클론

```bash
git clone <repository-url>
cd ai-nutrition-mvp
```

#### 2. 백엔드 설정

```bash
cd server
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 OPENAI_API_KEY 추가 (선택사항)
```

`.env` 파일:

```env
PORT=5001
OPENAI_API_KEY=your_openai_api_key_here
```

#### 3. 백엔드 실행

```bash
npm run dev  # 개발 모드 (nodemon)
# 또는
npm run build && npm start  # 프로덕션 모드
```

백엔드는 `http://localhost:5001`에서 실행됩니다.

#### 4. 프론트엔드 설정

```bash
cd client
npm install
```

#### 5. 프론트엔드 실행

```bash
npm start
```

프론트엔드는 `http://localhost:3000`에서 실행되며, `package.json`의 `proxy` 설정을 통해 백엔드와 자동 연결됩니다.

## 📡 API 엔드포인트

### 1. 증상 추천

```
POST /api/symptoms/suggest
Body: { age: number, gender: "male" | "female" }
Response: { symptoms: string[] }
```

### 2. 분석 및 전략 생성

```
POST /api/analyze
Body: {
  age: number,
  gender: "male" | "female",
  selected_symptoms: string[]
}
Response: {
  strategies: [
    { id: "light" | "full", name: string, description: string, ... }
  ]
}
```

### 3. 용량 추천

```
POST /api/dosages/recommend
Body: {
  age: number,
  gender: "male" | "female",
  strategy: "light" | "full",
  selected_ingredient_ids: string[],
  selected_symptoms: string[]
}
Response: {
  recommendations: { ingredientId: string, recommendedDosage: number, ... }[]
}
```

### 4. 제품 번들 추천

```
POST /api/recommend
Body: {
  strategy: "light" | "full",
  selected_tags: string[],
  target_dosages: Record<string, number>
}
Response: {
  bundles: BundleSet[]
}
```

## 🎨 주요 기능 설명

### 1. 멀티 스텝 폼

- 한 화면에 하나의 질문만 표시하여 사용자 집중도 향상
- 8단계 플로우: 대상 선택 → 프로필 → 증상 → 분석 → 전략 → 용량 → 리포트 → 상세

### 2. AI 기반 전략 생성

- OpenAI GPT-4o-mini를 활용한 지능형 분석
- 사용자 증상과 연령대에 맞는 성분 추천
- Light/Full 두 가지 전략 제공

### 3. 실시간 학습 현황

- 논문 학습 통계를 홈 화면에 표시
- 사용자 신뢰도 향상

### 4. 반응형 디자인

- 모바일 우선 설계 (390px 기준)
- Toss 스타일 미니멀 디자인

## 🛠️ 기술적 의사결정

### 데이터베이스 없이 JSON 파일 사용

- **이유**: MVP 단계에서 빠른 프로토타이핑과 간단한 배포를 위해
- **장점**: 설정 간소화, 배포 용이성
- **향후 개선**: 실제 서비스에서는 PostgreSQL/MongoDB 도입 고려

### Create React App 사용

- **이유**: 빠른 개발 시작, 검증된 설정
- **장점**: Zero-config, 안정성
- **향후 개선**: 성능 최적화가 필요하면 Vite로 마이그레이션 고려

### TypeScript 전면 사용

- **이유**: 타입 안정성, 개발자 경험 향상
- **장점**: 컴파일 타임 에러 방지, 자동완성

### Docker 기반 배포

- **이유**: 환경 일관성, 확장성
- **장점**: 로컬/프로덕션 환경 동일성 보장

## 📦 배포

자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

### 빠른 배포 요약

1. **백엔드 (Cloudtype)**

   - Git 저장소 연결
   - Dockerfile 경로: `server/Dockerfile`
   - 환경 변수: `OPENAI_API_KEY`, `PORT`

2. **프론트엔드 (Vercel)**
   - Git 저장소 연결
   - 루트 디렉토리: `client`
   - 환경 변수: `REACT_APP_API_URL` (백엔드 URL)

## 🧪 테스트

```bash
# 백엔드 빌드 테스트
cd server
npm run build

# 프론트엔드 빌드 테스트
cd client
npm run build
```

## 📝 주요 파일 설명

- `client/src/components/AnalysisFlow.tsx`: 메인 분석 플로우 로직
- `server/src/server.ts`: Express 서버 및 API 엔드포인트
- `server/src/data/products.ts`: 제품 데이터 (자동 생성)
- `client/src/api/client.ts`: API 클라이언트 래퍼

## 📄 라이선스

이 프로젝트는 면접 과제용으로 제작되었습니다.

## 👤 개발자

면접 과제 제출용 프로젝트

---
