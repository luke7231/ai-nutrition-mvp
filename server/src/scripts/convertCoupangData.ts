/**
 * 쿠팡에서 수집한 제품 데이터를 우리 형식으로 변환하는 스크립트
 *
 * 사용법:
 * 1. CSV 파일 준비 (coupang_products.csv)
 * 2. npm run convert:coupang 실행
 */

import * as fs from "fs";
import * as path from "path";
import { Product } from "../data/products";
import { ingredientCatalog } from "../data/ingredients";
import { ingredientTagMap } from "../data/products";

// CSV 형식: brand,name,ingredientId,price,dailyDosage,pillsPerDay,imageUrl,productUrl,description
interface CoupangRawData {
  brand: string;
  name: string;
  ingredientId: string;
  price: number;
  dailyDosage: number;
  pillsPerDay: number;
  imageUrl: string;
  productUrl?: string;
  description?: string;
}

/**
 * 가격대 분류
 */
function classifyPriceTier(price: number): "budget" | "standard" | "premium" {
  if (price < 25000) return "budget";
  if (price < 45000) return "standard";
  return "premium";
}

/**
 * 제품명/설명에서 알약 크기 추출
 */
function extractPillSize(text: string): string {
  const lower = text.toLowerCase();
  if (
    lower.includes("큰") ||
    lower.includes("대형") ||
    lower.includes("large")
  ) {
    return "큰 정제";
  }
  if (
    lower.includes("작은") ||
    lower.includes("소형") ||
    lower.includes("small")
  ) {
    return "작은 정제";
  }
  if (lower.includes("캡슐") || lower.includes("capsule")) {
    return "캡슐형";
  }
  if (lower.includes("소프트젤") || lower.includes("softgel")) {
    return "소프트젤";
  }
  return "중간 정제";
}

/**
 * 설명에서 특징 추출
 */
function extractFeatures(description: string): string[] {
  const features: string[] = [];
  const lower = description.toLowerCase();

  const keywordMap: Record<string, string> = {
    gmp: "GMP 인증 시설에서 생산",
    유기농: "유기농 인증",
    고함량: "고함량 함유",
    기능성: "기능성 인정",
    표준화: "표준화 추출물 사용",
    장용성: "장용성 코팅",
    비린내: "비린내 없는",
    고흡수: "고흡수율",
    활성형: "활성형",
  };

  for (const [keyword, feature] of Object.entries(keywordMap)) {
    if (lower.includes(keyword)) {
      features.push(feature);
    }
  }

  // 최대 3개까지만
  return features.slice(0, 3);
}

/**
 * 섭취 시간 추정 (성분별 기본값 사용)
 */
function getIntakeTime(ingredientId: string): "morning" | "evening" | "both" {
  const ingredientInfo = ingredientCatalog[ingredientId];
  if (ingredientInfo && "intakeTime" in ingredientInfo) {
    return (ingredientInfo as any).intakeTime || "both";
  }
  return "both";
}

/**
 * 종합 비타민 등 여러 성분 포함 여부 감지
 */
function detectMultipleIngredients(
  name: string,
  description: string
): { ingredientIds: string[]; dosages: Record<string, number> } | null {
  const text = (name + " " + description).toLowerCase();

  // 종합 비타민 키워드 확인
  const multiVitaminKeywords = [
    "종합",
    "멀티",
    "multi",
    "복합",
    "비타민 복합",
    "비타민 종합",
  ];

  const isMultiVitamin = multiVitaminKeywords.some((keyword) =>
    text.includes(keyword)
  );

  if (!isMultiVitamin) {
    return null;
  }

  // 포함된 성분들 추출
  const detectedIngredients: string[] = [];
  const dosages: Record<string, number> = {};

  // 성분 매핑 (ingredientCatalog에 있는 것만)
  const ingredientPatterns: Array<{ keywords: string[]; id: string }> = [
    {
      keywords: ["비타민b", "vitamin b", "b complex", "b복합"],
      id: "vitaminB",
    },
    { keywords: ["비타민c", "vitamin c"], id: "vitaminC" },
    { keywords: ["비타민d", "vitamin d"], id: "vitaminD" },
    { keywords: ["비타민a", "vitamin a"], id: "vitaminA" },
    { keywords: ["마그네슘", "magnesium"], id: "magnesium" },
    { keywords: ["칼슘", "calcium"], id: "calcium" },
    { keywords: ["아연", "zinc"], id: "zinc" },
    { keywords: ["철분", "iron"], id: "iron" },
    { keywords: ["엽산", "folic acid", "folate"], id: "vitaminB" },
    { keywords: ["밀크씨슬", "실리마린", "milk thistle"], id: "silymarin" },
    { keywords: ["오메가3", "omega3", "omega-3", "epa", "dha"], id: "omega3" },
    { keywords: ["글루코사민", "glucosamine"], id: "glucosamine" },
    { keywords: ["코엔자임", "coq10", "coenzyme"], id: "coq10" },
    { keywords: ["프로바이오틱스", "probiotics"], id: "probiotics" },
    { keywords: ["루테인", "lutein"], id: "lutein" },
    { keywords: ["콜라겐", "collagen"], id: "collagen" },
  ];

  ingredientPatterns.forEach(({ keywords, id }) => {
    // ingredientCatalog에 있는 성분만 추가
    if (!ingredientCatalog[id]) {
      return;
    }

    if (keywords.some((kw) => text.includes(kw))) {
      if (!detectedIngredients.includes(id)) {
        detectedIngredients.push(id);
      }

      // 함량 추출 시도 (예: "비타민B 50mg", "비타민D 1000IU")
      const pattern = new RegExp(
        `(${keywords.join("|")})\\s*(?:\\s|:|-)?(\\d+)\\s*(mg|mcg|μg|iu|IU)`,
        "i"
      );
      const match = text.match(pattern);
      if (match && match[2]) {
        let value = parseInt(match[2]);
        const unit = match[3]?.toLowerCase();

        // IU를 mg으로 변환 (비타민D 등)
        if (unit === "iu" && id === "vitaminD") {
          // 비타민D: 1IU = 0.025mcg, 일반적으로 1000IU = 25mcg = 0.025mg
          // 하지만 여기서는 IU 값을 그대로 사용 (단위는 unit 필드로 구분)
          // 실제로는 IU를 그대로 저장하고, 표시할 때만 변환
        }

        dosages[id] = value;
      }
    }
  });

  // 최소 2개 이상의 성분이 감지되어야 종합 비타민으로 인정
  if (detectedIngredients.length >= 2) {
    return {
      ingredientIds: detectedIngredients,
      dosages,
    };
  }

  return null;
}

/**
 * 쿠팡 원본 데이터를 우리 Product 형식으로 변환
 */
function convertCoupangToProduct(raw: CoupangRawData, index: number): Product {
  const fullText = `${raw.name} ${raw.description || ""}`;

  // ingredientId가 "multi"인 경우 강제로 종합 비타민으로 처리
  const isMulti =
    raw.ingredientId === "multi" || raw.ingredientId.trim() === "multi";

  // 종합 비타민 등 여러 성분 포함 여부 확인
  const multiIngredient = isMulti
    ? detectMultipleIngredients(raw.name, raw.description || "") || {
        ingredientIds: [],
        dosages: {},
      }
    : detectMultipleIngredients(raw.name, raw.description || "");

  // 단일 성분 제품인 경우
  if (!multiIngredient) {
    // 성분 정보 확인
    const ingredientInfo = ingredientCatalog[raw.ingredientId];
    if (!ingredientInfo) {
      throw new Error(`Unknown ingredientId: ${raw.ingredientId}`);
    }

    // 가격대 분류
    const priceTier = classifyPriceTier(raw.price);

    // 태그 (성분별 기본 태그 사용)
    const baseTags = ingredientTagMap[raw.ingredientId] || [];

    // 특징 추출
    const features = extractFeatures(fullText);
    // 특징이 없으면 기본값
    if (features.length === 0) {
      features.push(`${ingredientInfo.name} 함유`);
    }

    return {
      id: `${raw.ingredientId}_${priceTier}_${index}`,
      brand: raw.brand.trim(),
      name: raw.name.trim(),
      ingredientId: raw.ingredientId,
      ingredient: ingredientInfo.name,
      dailyDosage: raw.dailyDosage,
      tags: baseTags,
      image_url: raw.imageUrl.trim(),
      price: raw.price,
      pillSize: extractPillSize(fullText),
      pillsPerDay: raw.pillsPerDay || 1,
      intakeTime: getIntakeTime(raw.ingredientId),
      features,
      essential: priceTier === "budget",
      productUrl: raw.productUrl?.trim() || undefined,
      description: raw.description?.trim() || undefined,
    };
  }

  // 종합 비타민 등 여러 성분 포함 제품
  const priceTier = classifyPriceTier(raw.price);

  // ingredientId가 "multi"인 경우 description에서 성분 추출 시도
  if (isMulti && multiIngredient.ingredientIds.length === 0) {
    // description에서 성분 추출 시도
    const desc = raw.description || "";
    const text = (raw.name + " " + desc).toLowerCase();

    // 성분 패턴 매칭
    const ingredientPatterns: Array<{ keywords: string[]; id: string }> = [
      { keywords: ["칼슘", "calcium"], id: "calcium" },
      { keywords: ["마그네슘", "magnesium"], id: "magnesium" },
      { keywords: ["비타민d", "vitamin d"], id: "vitaminD" },
      { keywords: ["아연", "zinc"], id: "zinc" },
      { keywords: ["비타민b", "vitamin b"], id: "vitaminB" },
      { keywords: ["비타민c", "vitamin c"], id: "vitaminC" },
    ];

    const detected: string[] = [];
    const dosages: Record<string, number> = {};

    ingredientPatterns.forEach(({ keywords, id }) => {
      if (!ingredientCatalog[id]) return;
      if (keywords.some((kw) => text.includes(kw))) {
        detected.push(id);
        // 함량 추출 시도
        const pattern = new RegExp(
          `(${keywords.join("|")})\\s*(?:\\s|:|-)?(\\d+)\\s*(mg|mcg|μg|iu|IU)`,
          "i"
        );
        const match = text.match(pattern);
        if (match && match[2]) {
          dosages[id] = parseInt(match[2]);
        }
      }
    });

    if (detected.length > 0) {
      multiIngredient.ingredientIds = detected;
      multiIngredient.dosages = { ...multiIngredient.dosages, ...dosages };
    } else {
      // 기본값으로 칼슘과 마그네슘 사용
      multiIngredient.ingredientIds = ["calcium", "magnesium"];
    }
  }

  // 주요 성분은 첫 번째로 감지된 성분 또는 기본값
  const primaryIngredientId = multiIngredient.ingredientIds[0] || "calcium";
  const primaryIngredientInfo = ingredientCatalog[primaryIngredientId];

  if (!primaryIngredientInfo) {
    throw new Error(`Unknown primary ingredientId: ${primaryIngredientId}`);
  }

  // 모든 태그 합치기
  const allTags = new Set<string>();
  multiIngredient.ingredientIds.forEach((id) => {
    const tags = ingredientTagMap[id] || [];
    tags.forEach((tag: string) => allTags.add(tag));
  });

  // 특징 추출
  const features = extractFeatures(fullText);
  if (features.length === 0) {
    features.push("종합 비타민");
    features.push("다중 영양소 함유");
  }

  // 각 성분별 함량 설정 (추출된 값 또는 기본값)
  const dosages: Record<string, number> = {};
  multiIngredient.ingredientIds.forEach((id) => {
    if (multiIngredient.dosages[id]) {
      dosages[id] = multiIngredient.dosages[id];
    } else {
      // 기본값은 해당 성분의 권장량
      const info = ingredientCatalog[id];
      if (info) {
        dosages[id] = info.recommended;
      }
    }
  });

  return {
    id: `multi_${priceTier}_${index}`,
    brand: raw.brand.trim(),
    name: raw.name.trim(),
    ingredientId: primaryIngredientId, // 호환성을 위해 주요 성분
    ingredient: primaryIngredientInfo.name,
    ingredientIds: multiIngredient.ingredientIds, // 포함된 모든 성분
    dailyDosage: raw.dailyDosage || primaryIngredientInfo.recommended, // 주요 성분 함량
    dosages, // 각 성분별 함량
    tags: Array.from(allTags),
    image_url: raw.imageUrl.trim(),
    price: raw.price,
    pillSize: extractPillSize(fullText),
    pillsPerDay: raw.pillsPerDay || 1,
    intakeTime: "both", // 종합 비타민은 보통 아침/저녁 모두 가능
    features,
    essential: priceTier === "budget",
    productUrl: raw.productUrl?.trim() || undefined,
    description: raw.description?.trim() || undefined,
  };
}

/**
 * CSV 파일 읽기 및 파싱
 */
function parseCSV(csvPath: string): CoupangRawData[] {
  const content = fs.readFileSync(csvPath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim());

  // 헤더 제거
  const header = lines[0];
  const dataLines = lines.slice(1);

  return dataLines.map((line, index) => {
    // CSV 파싱 (큰따옴표로 감싸진 필드 내부의 쉼표 처리)
    const parts: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // 큰따옴표 이스케이프 ("")
          current += '"';
          i++; // 다음 큰따옴표 건너뛰기
        } else {
          // 큰따옴표 시작/끝
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        // 필드 구분자 (큰따옴표 밖에서만)
        parts.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    // 마지막 필드 추가
    parts.push(current.trim());

    // 큰따옴표 제거
    const cleanedParts = parts.map((p) => p.replace(/^"|"$/g, ""));

    if (cleanedParts.length < 7) {
      throw new Error(
        `Line ${
          index + 2
        }: Invalid CSV format. Expected at least 7 columns, got ${
          cleanedParts.length
        }.`
      );
    }

    return {
      brand: cleanedParts[0] || "알 수 없음",
      name: cleanedParts[1] || "제품명 없음",
      ingredientId: cleanedParts[2]?.trim() || "",
      price: parseInt(cleanedParts[3]) || 0,
      dailyDosage: parseInt(cleanedParts[4]) || 0,
      pillsPerDay: parseInt(cleanedParts[5]) || 1,
      imageUrl: cleanedParts[6] || "",
      productUrl: cleanedParts[7] || "",
      description: cleanedParts[8] || "",
    };
  });
}

/**
 * 제품 데이터 검증
 */
function validateProduct(product: Product): string[] {
  const errors: string[] = [];

  if (!product.ingredientId || !ingredientCatalog[product.ingredientId]) {
    errors.push(`Invalid ingredientId: ${product.ingredientId}`);
  }

  if (product.dailyDosage <= 0) {
    errors.push(`Invalid dailyDosage: ${product.dailyDosage}`);
  }

  if (product.price <= 0) {
    errors.push(`Invalid price: ${product.price}`);
  }

  if (!product.image_url || !product.image_url.startsWith("http")) {
    errors.push(`Invalid image_url: ${product.image_url}`);
  }

  if (!product.brand || product.brand.trim() === "") {
    errors.push(`Missing brand`);
  }

  if (!product.name || product.name.trim() === "") {
    errors.push(`Missing name`);
  }

  return errors;
}

/**
 * 메인 실행 함수
 */
async function main() {
  const csvPath = path.join(__dirname, "../../coupang_products.csv");

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV 파일을 찾을 수 없습니다: ${csvPath}`);
    console.log("📝 CSV 파일 형식:");
    console.log(
      "brand,name,ingredientId,price,imageUrl,dailyDosage,pillsPerDay,productUrl,description"
    );
    process.exit(1);
  }

  console.log("📖 CSV 파일 읽는 중...");
  const rawData = parseCSV(csvPath);
  console.log(`✅ ${rawData.length}개 행 읽기 완료`);

  console.log("🔄 제품 데이터 변환 중...");
  const products: Product[] = [];
  const errors: Array<{ index: number; errors: string[] }> = [];

  rawData.forEach((raw, index) => {
    try {
      const product = convertCoupangToProduct(raw, index);
      const validationErrors = validateProduct(product);

      if (validationErrors.length > 0) {
        errors.push({ index: index + 2, errors: validationErrors });
      } else {
        products.push(product);
      }
    } catch (error) {
      errors.push({
        index: index + 2,
        errors: [error instanceof Error ? error.message : String(error)],
      });
    }
  });

  if (errors.length > 0) {
    console.warn(`⚠️  ${errors.length}개 제품에 오류가 있습니다:`);
    errors.forEach(({ index, errors: errs }) => {
      console.warn(`  행 ${index}: ${errs.join(", ")}`);
    });
  }

  console.log(`✅ ${products.length}개 제품 변환 완료`);

  // TypeScript 파일로 출력
  const outputPath = path.join(__dirname, "../data/products_imported.ts");
  const output = `// 이 파일은 자동 생성되었습니다. 수동 수정하지 마세요.
// 재생성: npm run convert:coupang

export interface Product {
  id: string;
  brand: string;
  name: string;
  ingredientId: string; // 주요 성분 ID (호환성 유지)
  ingredient: string; // 주요 성분명
  // 복수 성분 지원 (종합 비타민 등)
  ingredientIds?: string[]; // 포함된 모든 성분 ID 배열
  dailyDosage: number; // 주요 성분의 일일 섭취량
  // 각 성분별 함량 (종합 비타민의 경우)
  dosages?: Record<string, number>; // { "vitaminB": 50, "vitaminC": 500, ... }
  tags: string[];
  image_url: string;
  price: number;
  pillSize: string;
  pillsPerDay: number;
  intakeTime: "morning" | "evening" | "both";
  features: string[];
  essential?: boolean; // light 전략에서 필수 제품 여부
  productUrl?: string; // 쿠팡 제품 URL
  description?: string; // 제품 설명
}

export const products: Product[] = ${JSON.stringify(
    products,
    null,
    2
  )} as Product[];

export const productCount = ${products.length};
`;

  fs.writeFileSync(outputPath, output, "utf-8");
  console.log(`📝 출력 파일: ${outputPath}`);
  console.log(
    `\n✨ 완료! 이제 products_imported.ts를 products.ts로 교체하세요.`
  );
}

// 실행
if (require.main === module) {
  main().catch(console.error);
}

export { convertCoupangToProduct, parseCSV, validateProduct };
