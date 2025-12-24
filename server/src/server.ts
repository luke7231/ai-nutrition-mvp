import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { products } from "./data/products";
import { symptoms } from "./data/symptoms";
import { ingredientCatalog } from "./data/ingredients";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key",
});

// Helper to map age to group string
const getAgeGroup = (age: number): string => {
  if (age < 30) return "20";
  if (age < 40) return "30";
  if (age < 50) return "40";
  if (age < 60) return "50";
  return "60";
};

// --- Routes ---

// API 1: Suggest Symptoms (Fast Track)
app.post("/api/symptoms/suggest", (req: Request, res: Response) => {
  const { age, gender } = req.body;

  if (!age || !gender) {
    res.status(400).json({ error: "Age and gender are required." });
    return;
  }

  const ageGroup = getAgeGroup(Number(age));
  const key = `${ageGroup}_${gender}`;
  const suggestedSymptoms = symptoms[key] || [];

  res.json({ symptoms: suggestedSymptoms });
});

// API 2: Analyze & Generate Strategies (Step 3.5)
app.post("/api/analyze", async (req: Request, res: Response) => {
  const { age, gender, selected_symptoms } = req.body;

  if (!selected_symptoms || !Array.isArray(selected_symptoms)) {
    res.status(400).json({ error: "Selected symptoms are required." });
    return;
  }

  const availableTags = Array.from(new Set(products.flatMap((p) => p.tags)));
  const availableIngredientIds = Array.from(
    new Set(products.map((p) => p.ingredientId))
  ).filter((id) => !!ingredientCatalog[id]);

  try {
    let aiResponse;
    const primarySymptom =
      selected_symptoms?.find((s: unknown) => typeof s === "string") || "";

    if (
      process.env.OPENAI_API_KEY &&
      process.env.OPENAI_API_KEY !== "dummy_key"
    ) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `당신은 친절한 약사입니다. 사용자 정보(나이: ${age}, 성별: ${gender})와 증상(${selected_symptoms.join(
              ", "
            )})을 바탕으로, 
                        우리 재고의 태그(${availableTags.join(
                          ", "
                        )})와 사용 가능한 성분 ID(${availableIngredientIds.join(
              ", "
            )})를 활용하여 2가지 영양제 조합 전략을 제안해주세요.
                        
                        사용 가능한 성분 ID 목록(반드시 여기서만 선택):
                        ${availableIngredientIds
                          .map((id) => `${id}: ${ingredientCatalog[id].name}`)
                          .join("\n")}

                        반드시 다음 지침을 따라주세요:
                        1. **summary**: "증상"이 아니라 **영양소/성분(nutrition)** 3개를 우선순위대로 선정해서 리스트 문자열로 작성하세요.
                           - 각 줄은 반드시 "1. [성분명]: [추천 이유]" 형식
                           - [성분명]은 반드시 위 "사용 가능한 성분 ID 목록"에 대응되는 성분명이어야 함
                           - 금지: 증상명(예: 수면장애/피로/변비 등)을 [성분명] 위치에 쓰기
                           형식: "1. [성분명]: [추천 이유]\n2. [성분명]: [추천 이유]\n3. [성분명]: [추천 이유]"
                        
                        2. **strategies**: 딱 2가지 전략(light/full)만 제안해주세요.
                           - 전략 1 (id: "light"): "가볍게 시작하기" (필수 성분 위주, 2-3개)
                             description: "일단 이렇게 먹어보는 걸로 시작해요! 부담 없이 시작할 수 있습니다."
                             tags_text: 실제 추천하는 성분 조합 텍스트 (예: "밀크씨슬 + 오메가3")
                             selected_ingredient_ids: 사용 가능한 성분 ID 중에서 선택 (배열, 2-3개)
                             ingredient_briefs: 선택한 성분들에 대한 간단 설명(배열)
                               - shortDescription: 성분 자체의 역할(짧게)
                               - whyHelpful: **사용자가 선택한 증상에 왜 도움이 되는지** 1~2문장으로 구체적으로 설명
                               - 금지: "간 건강에 좋다"처럼 증상과 연결되지 않는 일반론만 쓰기

                           - 전략 2 (id: "full"): "확실하게 관리하기" (고기능성, 프리미엄 위주, 4-5개)
                             description: 구체적인 상황을 예시로 들어 공감을 유도하세요.
                             tags_text: 실제 추천하는 성분 조합 텍스트 (예: "밀크씨슬 + 오메가3 + 글루코사민 + 코엔자임Q10")
                             selected_ingredient_ids: 사용 가능한 성분 ID 중에서 선택 (배열, 3-5개)
                             ingredient_briefs: 선택한 성분들에 대한 간단 설명(배열)
                               - shortDescription: 성분 자체의 역할(짧게)
                               - whyHelpful: **사용자가 선택한 증상에 왜 도움이 되는지** 1~2문장으로 구체적으로 설명
                               - 금지: "간 건강에 좋다"처럼 증상과 연결되지 않는 일반론만 쓰기

                        다음 JSON 형식을 반드시 지켜주세요:
                        {
                            "summary": "1. 성분: 이유\\n2. 성분: 이유...",
                            "strategies": [
                                {
                                    "id": "light",
                                    "title": "가볍게 시작하기",
                                    "description": "...",
                                    "tags_text": "성분1 + 성분2",
                                    "selected_ingredient_ids": ["ingredientId1", "ingredientId2"],
                                    "ingredient_briefs": [
                                      { "id": "ingredientId1", "name": "성분명", "shortDescription": "짧은 설명", "whyHelpful": "증상과 연결되는 구체적 이유" }
                                    ]
                                },
                                {
                                    "id": "full",
                                    "title": "확실하게 관리하기",
                                    "description": "...",
                                    "tags_text": "성분1 + 성분2 + 성분3",
                                    "selected_ingredient_ids": ["ingredientId1", "ingredientId2", "ingredientId3"],
                                    "ingredient_briefs": [
                                      { "id": "ingredientId1", "name": "성분명", "shortDescription": "짧은 설명", "whyHelpful": "증상과 연결되는 구체적 이유" }
                                    ]
                                }
                            ]
                        }`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const content = completion.choices[0].message.content;
      aiResponse = content ? JSON.parse(content) : null;
    }

    // Fallback / Mock
    if (!aiResponse) {
      console.warn("Using mock response for analysis.");
      const fallbackLight = ["vitaminD", "calcium"].filter(
        (id) => !!ingredientCatalog[id]
      );
      const fallbackFull = [
        "vitaminD",
        "calcium",
        "magnesium",
        "omega3",
      ].filter((id) => !!ingredientCatalog[id]);
      const buildWhyHelpful = (
        ingredientId: string,
        symptom: string
      ): string => {
        if (!symptom) return ingredientCatalog[ingredientId].shortDescription;
        // 최소한 "증상 ↔ 성분" 연결을 명시해서 납득 가능한 문장으로 만듭니다.
        if (symptom.includes("수면")) {
          if (ingredientId === "magnesium")
            return `${symptom}은 신경 흥분/근육 긴장과 연관될 수 있어요. 마그네슘은 근육 이완과 신경 안정에 관여해 수면에 도움이 될 수 있습니다.`;
          if (ingredientId === "vitaminD")
            return `${symptom}이 있을 때 낮 활동량·일주기 리듬이 흐트러질 수 있어요. 비타민D는 전반적인 컨디션/면역·근육 기능에 관여해 회복 리듬을 잡는 데 도움될 수 있습니다.`;
          if (ingredientId === "calcium")
            return `${symptom}은 근육 긴장으로 악화될 수 있어요. 칼슘은 근육 수축/이완에 관여해 마그네슘과 함께 균형을 맞추는 데 도움이 될 수 있습니다.`;
        }
        if (symptom.includes("피로")) {
          if (ingredientId === "vitaminB")
            return `${symptom}은 에너지 대사 효율과 관련이 있어요. 비타민B군은 에너지 대사에 관여해 피로감 완화에 도움될 수 있습니다.`;
          if (ingredientId === "coq10")
            return `${symptom}은 에너지 생성 저하와 연관될 수 있어요. 코엔자임Q10은 세포 에너지 생성(미토콘드리아)에 관여해 활력에 도움될 수 있습니다.`;
          if (ingredientId === "iron")
            return `${symptom}이 빈혈/철 부족과 연관된 경우가 있어요. 철분은 산소 운반에 필요해 피로감 개선에 도움될 수 있습니다.`;
        }
        if (symptom.includes("골") || symptom.includes("골다공증")) {
          if (ingredientId === "vitaminD")
            return `${symptom}에는 비타민D가 핵심이에요. 비타민D는 칼슘 흡수에 관여해 골 건강 유지에 도움될 수 있습니다.`;
          if (ingredientId === "calcium")
            return `${symptom}에는 칼슘 보충이 중요해요. 칼슘은 뼈 구성 성분으로 골밀도 유지에 도움될 수 있습니다.`;
        }
        if (symptom.includes("간")) {
          if (ingredientId === "silymarin")
            return `${symptom} 관리에서는 항산화/간세포 보호 관점이 중요해요. 실리마린은 간 건강 유지에 도움될 수 있습니다.`;
        }
        if (
          symptom.includes("혈행") ||
          symptom.includes("심혈관") ||
          symptom.includes("콜레스테롤")
        ) {
          if (ingredientId === "omega3")
            return `${symptom}에는 오메가3가 자주 추천돼요. EPA/DHA는 혈행·중성지방 관리에 관여해 심혈관 건강에 도움될 수 있습니다.`;
        }
        if (
          symptom.includes("변비") ||
          symptom.includes("소화") ||
          symptom.includes("장")
        ) {
          if (ingredientId === "probiotics")
            return `${symptom}에는 장내 균형이 중요해요. 프로바이오틱스는 장 건강과 배변 리듬에 도움될 수 있습니다.`;
        }
        if (symptom.includes("관절")) {
          if (ingredientId === "glucosamine")
            return `${symptom}에는 관절 구성 성분 보충이 도움이 될 수 있어요. 글루코사민은 관절/연골 건강 유지에 도움될 수 있습니다.`;
        }
        if (symptom.includes("눈")) {
          if (ingredientId === "lutein")
            return `${symptom}에는 항산화·황반 보호가 중요해요. 루테인은 눈 건강 유지에 도움될 수 있습니다.`;
        }
        if (symptom.includes("탈모")) {
          if (ingredientId === "zinc")
            return `${symptom}에는 단백질 합성/피부·모발 건강이 연결돼요. 아연은 정상적인 면역 기능과 세포 분열에 관여해 모발·피부 건강에 도움될 수 있습니다.`;
        }
        // 기본: 증상 + 성분의 역할을 연결한 문장
        return `${symptom} 관리에 필요한 핵심 축 중 하나는 ${ingredientCatalog[ingredientId].shortDescription}입니다. 이 성분은 전반적인 컨디션 개선에 도움될 수 있습니다.`;
      };

      const toBriefs = (ids: string[]) =>
        ids.map((id) => ({
          id,
          name: ingredientCatalog[id].name,
          shortDescription: ingredientCatalog[id].shortDescription,
          whyHelpful: buildWhyHelpful(id, primarySymptom),
        }));

      aiResponse = {
        summary: `1. ${ingredientCatalog.vitaminD.name}: ${ingredientCatalog.vitaminD.shortDescription}
2. ${ingredientCatalog.calcium.name}: ${ingredientCatalog.calcium.shortDescription}
3. ${ingredientCatalog.magnesium.name}: ${ingredientCatalog.magnesium.shortDescription}`,
        strategies: [
          {
            id: "light",
            title: "가볍게 시작하기",
            description:
              "가장 필수적인 성분만 담아 부담 없이 시작할 수 있습니다.",
            tags_text: "비타민D + 칼슘",
            selected_ingredient_ids: fallbackLight,
            ingredient_briefs: toBriefs(fallbackLight),
          },
          {
            id: "full",
            title: "확실하게 관리하기",
            description:
              "피로 회복과 에너지 충전에 집중했습니다. 최대 효과를 위한 완벽한 조합입니다.",
            tags_text: "비타민D + 칼슘 + 마그네슘 + 오메가3",
            selected_ingredient_ids: fallbackFull,
            ingredient_briefs: toBriefs(fallbackFull),
          },
        ],
      };
    }

    // 응답 보정: selected_ingredient_ids가 없거나 잘못되면 tags_text에서 추출/기본값으로 채움
    const normalize = (s: string) =>
      s.toLowerCase().replace(/\s+/g, "").replace(/[()]/g, "");
    const idByName = Object.values(ingredientCatalog).map((info) => ({
      id: info.id,
      normName: normalize(info.name),
    }));

    const toIdsFromTagsText = (tagsText: string): string[] => {
      const parts = tagsText
        .split("+")
        .map((p) => p.trim())
        .filter(Boolean)
        .map(normalize);
      const picked: string[] = [];
      for (const part of parts) {
        const found = idByName.find(
          ({ normName }) => normName.includes(part) || part.includes(normName)
        );
        if (found && !picked.includes(found.id)) picked.push(found.id);
      }
      return picked;
    };

    if (aiResponse?.strategies && Array.isArray(aiResponse.strategies)) {
      aiResponse.strategies = aiResponse.strategies.map((s: any) => {
        const rawIds: unknown[] = Array.isArray(s?.selected_ingredient_ids)
          ? s.selected_ingredient_ids
          : Array.isArray(s?.selected_tags)
          ? s.selected_tags
          : [];
        let ids: string[] = rawIds
          .filter((id: unknown): id is string => typeof id === "string")
          .filter((id: string) => !!ingredientCatalog[id]);
        if (ids.length === 0 && typeof s?.tags_text === "string") {
          ids = toIdsFromTagsText(s.tags_text).filter(
            (id) => !!ingredientCatalog[id]
          );
        }
        if (ids.length === 0) {
          ids =
            s?.id === "light"
              ? ["vitaminD", "calcium"]
              : ["vitaminD", "calcium", "magnesium", "omega3"];
          ids = ids.filter((id: string) => !!ingredientCatalog[id]);
        }
        ids = ids.slice(0, 5);

        const buildWhyHelpful = (
          ingredientId: string,
          symptom: string
        ): string => {
          // 위 fallback과 같은 규칙을 적용해 whyHelpful 누락/저품질을 방지
          // (중복 선언이지만 이 파일 내에서만 사용)
          if (!symptom) return ingredientCatalog[ingredientId].shortDescription;
          if (symptom.includes("수면")) {
            if (ingredientId === "magnesium")
              return `${symptom}은 신경 흥분/근육 긴장과 연관될 수 있어요. 마그네슘은 근육 이완과 신경 안정에 관여해 수면에 도움이 될 수 있습니다.`;
            if (ingredientId === "vitaminD")
              return `${symptom}이 있을 때 낮 활동량·일주기 리듬이 흐트러질 수 있어요. 비타민D는 전반적인 컨디션/면역·근육 기능에 관여해 회복 리듬을 잡는 데 도움될 수 있습니다.`;
            if (ingredientId === "calcium")
              return `${symptom}은 근육 긴장으로 악화될 수 있어요. 칼슘은 근육 수축/이완에 관여해 마그네슘과 함께 균형을 맞추는 데 도움이 될 수 있습니다.`;
          }
          if (symptom.includes("피로")) {
            if (ingredientId === "vitaminB")
              return `${symptom}은 에너지 대사 효율과 관련이 있어요. 비타민B군은 에너지 대사에 관여해 피로감 완화에 도움될 수 있습니다.`;
            if (ingredientId === "coq10")
              return `${symptom}은 에너지 생성 저하와 연관될 수 있어요. 코엔자임Q10은 세포 에너지 생성(미토콘드리아)에 관여해 활력에 도움될 수 있습니다.`;
            if (ingredientId === "iron")
              return `${symptom}이 빈혈/철 부족과 연관된 경우가 있어요. 철분은 산소 운반에 필요해 피로감 개선에 도움될 수 있습니다.`;
          }
          if (symptom.includes("골") || symptom.includes("골다공증")) {
            if (ingredientId === "vitaminD")
              return `${symptom}에는 비타민D가 핵심이에요. 비타민D는 칼슘 흡수에 관여해 골 건강 유지에 도움될 수 있습니다.`;
            if (ingredientId === "calcium")
              return `${symptom}에는 칼슘 보충이 중요해요. 칼슘은 뼈 구성 성분으로 골밀도 유지에 도움될 수 있습니다.`;
          }
          if (symptom.includes("간")) {
            if (ingredientId === "silymarin")
              return `${symptom} 관리에서는 항산화/간세포 보호 관점이 중요해요. 실리마린은 간 건강 유지에 도움될 수 있습니다.`;
          }
          if (
            symptom.includes("혈행") ||
            symptom.includes("심혈관") ||
            symptom.includes("콜레스테롤")
          ) {
            if (ingredientId === "omega3")
              return `${symptom}에는 오메가3가 자주 추천돼요. EPA/DHA는 혈행·중성지방 관리에 관여해 심혈관 건강에 도움될 수 있습니다.`;
          }
          if (
            symptom.includes("변비") ||
            symptom.includes("소화") ||
            symptom.includes("장")
          ) {
            if (ingredientId === "probiotics")
              return `${symptom}에는 장내 균형이 중요해요. 프로바이오틱스는 장 건강과 배변 리듬에 도움될 수 있습니다.`;
          }
          if (symptom.includes("관절")) {
            if (ingredientId === "glucosamine")
              return `${symptom}에는 관절 구성 성분 보충이 도움이 될 수 있어요. 글루코사민은 관절/연골 건강 유지에 도움될 수 있습니다.`;
          }
          if (symptom.includes("눈")) {
            if (ingredientId === "lutein")
              return `${symptom}에는 항산화·황반 보호가 중요해요. 루테인은 눈 건강 유지에 도움될 수 있습니다.`;
          }
          if (symptom.includes("탈모")) {
            if (ingredientId === "zinc")
              return `${symptom}에는 단백질 합성/피부·모발 건강이 연결돼요. 아연은 정상적인 면역 기능과 세포 분열에 관여해 모발·피부 건강에 도움될 수 있습니다.`;
          }
          return `${symptom} 관리에 필요한 핵심 축 중 하나는 ${ingredientCatalog[ingredientId].shortDescription}입니다. 이 성분은 전반적인 컨디션 개선에 도움될 수 있습니다.`;
        };

        const briefs = ids.map((id: string) => ({
          id,
          name: ingredientCatalog[id].name,
          shortDescription: ingredientCatalog[id].shortDescription,
          whyHelpful: buildWhyHelpful(id, primarySymptom),
        }));

        return {
          ...s,
          selected_ingredient_ids: ids,
          ingredient_briefs: briefs,
        };
      });
    }

    // summary 보정: "성분"이 아닌 값(증상 등)이 들어오지 않도록 서버에서 강제 교정
    const summaryText =
      typeof aiResponse?.summary === "string" ? aiResponse.summary : "";
    const hasIngredientName = Object.values(ingredientCatalog).some((info) =>
      summaryText.includes(info.name)
    );
    const containsSymptom = selected_symptoms.some(
      (sym: unknown) => typeof sym === "string" && summaryText.includes(sym)
    );
    const looksLikeList = /^\s*1\.\s*.+:\s*.+/m.test(summaryText);

    if (!hasIngredientName || containsSymptom || !looksLikeList) {
      const pickFrom =
        aiResponse?.strategies?.find((s: any) => s?.id === "full") ??
        aiResponse?.strategies?.[0];
      const ids: string[] = Array.isArray(pickFrom?.selected_ingredient_ids)
        ? pickFrom.selected_ingredient_ids.filter(
            (id: unknown) => typeof id === "string"
          )
        : [];
      const top = ids.filter((id) => !!ingredientCatalog[id]).slice(0, 3);
      const safeIds =
        top.length > 0
          ? top
          : (["vitaminD", "calcium", "magnesium"] as const).filter(
              (id) => !!ingredientCatalog[id]
            );
      aiResponse.summary = safeIds
        .map(
          (id, idx) =>
            `${idx + 1}. ${ingredientCatalog[id].name}: ${
              ingredientCatalog[id].shortDescription
            }`
        )
        .join("\n");
    }

    res.json(aiResponse);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API 3: Recommend Dosages (Step 6)
app.post("/api/dosages/recommend", async (req: Request, res: Response) => {
  const {
    age,
    gender,
    strategy,
    selected_tags,
    selected_ingredient_ids,
    selected_symptoms,
  } = req.body;

  if (!age || !gender || !strategy) {
    res.status(400).json({ error: "Age, gender, and strategy are required." });
    return;
  }

  // 연속 경험: Step5에서 선택한 성분 ID를 우선 사용하고,
  // 없으면 전략별 기본값으로 fallback 합니다.
  const rawIds = Array.isArray(selected_ingredient_ids)
    ? selected_ingredient_ids
    : Array.isArray(selected_tags)
    ? selected_tags
    : [];

  const selectedIds = rawIds
    .filter((id: unknown) => typeof id === "string")
    .filter((id: string) => !!ingredientCatalog[id])
    .slice(0, 5);

  const fallbackIds =
    strategy === "light"
      ? (["vitaminD", "calcium"] as const)
      : (["vitaminD", "calcium", "magnesium", "omega3"] as const);

  const ingredientIds =
    selectedIds.length > 0
      ? selectedIds
      : fallbackIds.filter((id) => !!ingredientCatalog[id]);

  try {
    let rationale = "";
    let dosages: Record<string, number> = {};

    // LLM을 사용하여 나이/성별/증상에 맞는 권장량 생성
    if (
      process.env.OPENAI_API_KEY &&
      process.env.OPENAI_API_KEY !== "dummy_key"
    ) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `당신은 영양학 전문가입니다. 사용자 정보(나이: ${age}, 성별: ${gender})와 증상(${
              selected_symptoms?.join(", ") || "없음"
            })을 바탕으로, 
                        다음 성분들(${ingredientIds.join(
                          ", "
                        )})에 대한 권장 일일 섭취량을 제안해주세요.
                        
                        각 성분별 기본 정보:
                        ${ingredientIds
                          .map((id) => {
                            const info = ingredientCatalog[id];
                            return `${id}: ${info.name}, 권장: ${info.recommended}${info.unit}, 안전상한: ${info.safeMax}${info.unit}`;
                          })
                          .join("\n")}
                        
                        다음 JSON 형식을 반드시 지켜주세요:
                        {
                            "dosages": {
                                "silymarin": 420,
                                "omega3": 1000,
                                ...
                            },
                            "rationale": "간단한 추천 근거 설명"
                        }`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const content = completion.choices[0].message.content;
      if (content) {
        const parsed = JSON.parse(content);
        dosages = parsed.dosages || {};
        rationale = parsed.rationale || "";
      }
    }

    // 기본값 설정 (LLM 실패 시)
    ingredientIds.forEach((id) => {
      if (typeof dosages[id] !== "number" || Number.isNaN(dosages[id])) {
        dosages[id] = ingredientCatalog[id].recommended;
      }
      // 안전 범위 체크
      if (dosages[id] > ingredientCatalog[id].safeMax) {
        dosages[id] = ingredientCatalog[id].safeMax;
      }
      if (dosages[id] < ingredientCatalog[id].min) {
        dosages[id] = ingredientCatalog[id].min;
      }
    });

    if (!rationale) {
      rationale = `${age}세 ${
        gender === "male" ? "남성" : "여성"
      }에게 적합한 권장량입니다.`;
    }

    const ingredients = ingredientIds.map((id) => ({
      id,
      name: ingredientCatalog[id].name,
      unit: ingredientCatalog[id].unit,
      min: ingredientCatalog[id].min,
      max: ingredientCatalog[id].max,
      recommended: ingredientCatalog[id].recommended,
      safeMax: ingredientCatalog[id].safeMax,
      description: ingredientCatalog[id].shortDescription,
      source: ingredientCatalog[id].source,
    }));

    res.json({
      ingredients,
      dosages,
      rationale,
    });
  } catch (error) {
    console.error("Dosage Recommendation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API 4: Product Bundles Recommendation (Step 7)
app.post("/api/recommend", (req: Request, res: Response) => {
  const { strategy, selected_tags, target_dosages } = req.body;

  if (!target_dosages || typeof target_dosages !== "object") {
    res.status(400).json({ error: "Target dosages are required." });
    return;
  }

  const ingredientIds = Object.keys(target_dosages);

  // 각 성분별로 후보 제품 필터링 (dailyDosage >= target)
  const candidatesByIngredient: Record<string, typeof products> = {};

  ingredientIds.forEach((ingredientId) => {
    const target = target_dosages[ingredientId];

    // 단일 성분 제품 또는 종합 비타민(여러 성분 포함) 제품 모두 고려
    candidatesByIngredient[ingredientId] = products.filter((p) => {
      // 1. 주요 성분이 일치하는 경우
      if (p.ingredientId === ingredientId) {
        return p.dailyDosage >= target;
      }

      // 2. 종합 비타민 등 여러 성분을 포함하는 경우
      if (p.ingredientIds && p.ingredientIds.includes(ingredientId)) {
        // 해당 성분의 함량 확인
        const dosage = p.dosages?.[ingredientId] || p.dailyDosage;
        return dosage >= target;
      }

      return false;
    });

    // 후보가 없으면 가장 가까운 제품 선택
    if (candidatesByIngredient[ingredientId].length === 0) {
      const sorted = products
        .filter((p) => {
          // 단일 성분 제품
          if (p.ingredientId === ingredientId) return true;
          // 종합 비타민 등
          if (p.ingredientIds && p.ingredientIds.includes(ingredientId))
            return true;
          return false;
        })
        .sort((a, b) => {
          const aDosage =
            a.dosages?.[ingredientId] ||
            (a.ingredientId === ingredientId ? a.dailyDosage : 0);
          const bDosage =
            b.dosages?.[ingredientId] ||
            (b.ingredientId === ingredientId ? b.dailyDosage : 0);
          return Math.abs(aDosage - target) - Math.abs(bDosage - target);
        });
      candidatesByIngredient[ingredientId] = sorted.slice(0, 1);
    }
  });

  // 각 성분별로 가격 정렬
  ingredientIds.forEach((ingredientId) => {
    candidatesByIngredient[ingredientId].sort((a, b) => a.price - b.price);
  });

  // 3가지 가격대 번들 생성 (budget/standard/premium)
  const bundles = ["budget", "standard", "premium"].map((tier) => {
    const tierIndex = tier === "budget" ? 0 : tier === "standard" ? 1 : 2;
    const bundleProducts: typeof products = [];
    const usedProductIds = new Set<string>(); // 중복 제품 방지

    // 먼저 종합 비타민(여러 성분 포함) 제품을 우선 고려
    const multiIngredientProducts = products.filter(
      (p) => p.ingredientIds && p.ingredientIds.length >= 2
    );

    // 종합 비타민 중 필요한 성분을 가장 많이 커버하는 제품 찾기
    const findBestMultiProduct = (
      remainingIngredients: string[]
    ): (typeof products)[0] | null => {
      let bestProduct: (typeof products)[0] | null = null;
      let maxCoverage = 0;

      for (const product of multiIngredientProducts) {
        if (usedProductIds.has(product.id)) continue;

        const coverage = remainingIngredients.filter((id) =>
          product.ingredientIds?.includes(id)
        ).length;

        if (coverage > maxCoverage && coverage >= 2) {
          // 최소 2개 이상의 성분을 커버해야 함
          maxCoverage = coverage;
          bestProduct = product;
        }
      }

      return bestProduct;
    };

    // 필요한 성분 목록 (아직 커버되지 않은 것들)
    const remainingIngredients = [...ingredientIds];

    // 종합 비타민으로 커버 가능한 성분들 먼저 처리
    while (remainingIngredients.length > 0) {
      const multiProduct = findBestMultiProduct(remainingIngredients);
      if (!multiProduct) break;

      // 이 종합 비타민이 커버하는 성분들 제거
      const coveredIngredients = remainingIngredients.filter((id) =>
        multiProduct.ingredientIds?.includes(id)
      );

      // 모든 커버되는 성분의 함량이 목표치를 만족하는지 확인
      const allCovered = coveredIngredients.every((id) => {
        const target = target_dosages[id];
        const dosage =
          multiProduct.dosages?.[id] ||
          (multiProduct.ingredientId === id ? multiProduct.dailyDosage : 0);
        return dosage >= target;
      });

      if (allCovered && coveredIngredients.length >= 2) {
        bundleProducts.push(multiProduct);
        usedProductIds.add(multiProduct.id);
        // 커버된 성분들을 목록에서 제거
        coveredIngredients.forEach((id) => {
          const index = remainingIngredients.indexOf(id);
          if (index > -1) remainingIngredients.splice(index, 1);
        });
      } else {
        // 조건을 만족하지 않으면 더 이상 종합 비타민 찾지 않음
        break;
      }
    }

    // 남은 성분들은 단일 성분 제품으로 채우기
    remainingIngredients.forEach((ingredientId) => {
      const candidates = candidatesByIngredient[ingredientId].filter(
        (p) => !usedProductIds.has(p.id)
      );
      if (candidates.length === 0) return;

      // 분위수 기반 선택
      let index = 0;
      if (candidates.length > 1) {
        if (tier === "budget") {
          index = Math.floor(candidates.length * 0.2); // 20% 분위
        } else if (tier === "standard") {
          index = Math.floor(candidates.length * 0.5); // 50% 분위
        } else {
          index = Math.floor(candidates.length * 0.8); // 80% 분위
        }
        index = Math.min(index, candidates.length - 1);
      }

      const selectedProduct = candidates[index];
      bundleProducts.push(selectedProduct);
      usedProductIds.add(selectedProduct.id);
    });

    // 가격 계산
    const totalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
    const discount = tier === "budget" ? 15 : tier === "standard" ? 10 : 5;
    const discountedPrice = Math.floor(totalPrice * (1 - discount / 100));
    const monthlyPrice = discountedPrice;
    const dailyPrice = Math.floor(discountedPrice / 30);
    const savings = totalPrice - discountedPrice;

    const titles = {
      budget: "가볍게 시작할 수 있어요.",
      standard: "가장 표준이에요~",
      premium: "조금 더 욕심낸다면!",
    };

    const badges = {
      budget: "BEST",
      standard: "Popular",
      premium: "Premium",
    };

    return {
      id: tier,
      title: titles[tier as keyof typeof titles],
      badge: badges[tier as keyof typeof badges],
      badgeColor:
        tier === "budget"
          ? "bg-[#3182F6]"
          : tier === "standard"
          ? "bg-[#8B95A1]"
          : "bg-[#FF8A00]",
      discount,
      products: bundleProducts,
      pricing: {
        totalPrice,
        discountedPrice,
        monthlyPrice,
        dailyPrice,
        savings,
      },
      highlight: tier === "budget",
    };
  });

  // totalPrice 기준으로 정렬하여 budget/standard/premium 라벨 확정
  bundles.sort((a, b) => a.pricing.totalPrice - b.pricing.totalPrice);

  res.json({
    bundles,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
