export interface SymptomSuggestResponse {
  symptoms: string[];
}

export interface IngredientBrief {
  id: string;
  name: string;
  shortDescription: string;
  whyHelpful?: string;
}

export interface AnalyzeStrategy {
  id: "light" | "full";
  title: string;
  description: string;
  tags_text: string;
  // (구버전 호환) 서버에서 태그를 내려주던 시절 필드
  selected_tags?: string[];
  // (신버전) Step5에서 선택한 성분 ID를 Step6까지 이어주기 위한 필드
  selected_ingredient_ids?: string[];
  // Step5에서 3~5개 정도의 성분 설명을 바로 보여주기 위한 필드
  ingredient_briefs?: IngredientBrief[];
}

export interface AnalyzeResponse {
  summary: string;
  strategies: AnalyzeStrategy[];
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  min: number;
  max: number;
  recommended: number;
  safeMax: number;
  description: string;
  source: string;
}

export interface DosageRecommendResponse {
  ingredients: Ingredient[];
  dosages: Record<string, number>;
  rationale: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  ingredientId: string;
  ingredient: string;
  dailyDosage: number;
  tags: string[];
  image_url: string;
  price: number;
  pillSize: string;
  pillsPerDay: number;
  intakeTime: "morning" | "evening" | "both";
  features: string[];
  essential?: boolean;
  productUrl?: string; // 쿠팡 제품 URL
  description?: string; // 제품 설명
}

export interface BundleSet {
  id: "budget" | "standard" | "premium";
  title: string;
  badge: string;
  badgeColor: string;
  discount: number;
  products: Product[];
  pricing: {
    totalPrice: number;
    discountedPrice: number;
    monthlyPrice: number;
    dailyPrice: number;
    savings: number;
  };
  highlight: boolean;
}

export interface RecommendResponse {
  bundles: BundleSet[];
}
