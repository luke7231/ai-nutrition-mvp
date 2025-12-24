import axios from "axios";
import type {
  SymptomSuggestResponse,
  AnalyzeResponse,
  DosageRecommendResponse,
  RecommendResponse,
} from "./types";

// 기본은 상대 경로로 호출하고(CRA dev에선 package.json의 proxy가 처리),
// 필요할 때만 REACT_APP_API_URL로 절대 URL을 주입합니다.
const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  // Step 3: 증상 추천
  suggestSymptoms: async (
    age: number,
    gender: "male" | "female"
  ): Promise<SymptomSuggestResponse> => {
    const response = await apiClient.post("/api/symptoms/suggest", {
      age,
      gender,
    });
    return response.data;
  },

  // Step 4-5: 분석 및 전략 생성
  analyze: async (
    age: number,
    gender: "male" | "female",
    selectedSymptoms: string[]
  ): Promise<AnalyzeResponse> => {
    const response = await apiClient.post("/api/analyze", {
      age,
      gender,
      selected_symptoms: selectedSymptoms,
    });
    return response.data;
  },

  // Step 6: 권장 함량 추천
  recommendDosages: async (
    age: number,
    gender: "male" | "female",
    strategy: "light" | "full",
    selectedTags: string[],
    selectedSymptoms: string[]
  ): Promise<DosageRecommendResponse> => {
    const response = await apiClient.post("/api/dosages/recommend", {
      age,
      gender,
      strategy,
      // 서버는 selected_ingredient_ids를 우선으로 사용하고,
      // 구버전 호환을 위해 selected_tags도 함께 받습니다.
      selected_ingredient_ids: selectedTags,
      selected_tags: selectedTags,
      selected_symptoms: selectedSymptoms,
    });
    return response.data;
  },

  // Step 7: 제품 번들 추천
  recommendBundles: async (
    strategy: "light" | "full",
    selectedTags: string[],
    targetDosages: Record<string, number>
  ): Promise<RecommendResponse> => {
    const response = await apiClient.post("/api/recommend", {
      strategy,
      selected_tags: selectedTags,
      target_dosages: targetDosages,
    });
    return response.data;
  },
};
