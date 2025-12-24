import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Check,
  Minus,
  Plus,
  AlertTriangle,
  Info,
  ShieldCheck,
} from "lucide-react";
import { api } from "../api/client";
import type { Ingredient } from "../api/types";

const loadingMessages = [
  "실제 KC 인증이 된 것만 추리는 중이에요",
  "너무 최근에 나온 후기가 적은 제품은 제외하는 중이에요",
  "성분 함량을 정확히 검증하는 중이에요",
  "안전성 기준을 확인하는 중이에요",
  "제품 품질을 검토하는 중이에요",
  "권장 함량에 맞는 제품을 선별하는 중이에요",
  "신뢰할 수 있는 브랜드만 골라내는 중이에요",
];

interface IngredientDosageProps {
  formData: {
    target: string;
    gender: string;
    age: number;
    strategy: "light" | "full" | "";
    symptoms: string[];
    selectedTags: string[];
  };
  onSubmit: (dosages: Record<string, number>) => void;
  onBack: () => void;
}

export function IngredientDosage({
  formData,
  onSubmit,
  onBack,
}: IngredientDosageProps) {
  const ageGroup = Math.floor(formData.age / 10) * 10;
  const genderText = formData.gender === "male" ? "남성" : "여성";

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [dosages, setDosages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const fetchDosages = async () => {
      if (!formData.strategy) return;

      try {
        setLoading(true);
        setError(null);
        const response = await api.recommendDosages(
          formData.age,
          formData.gender as "male" | "female",
          formData.strategy,
          formData.selectedTags,
          formData.symptoms
        );
        setIngredients(response.ingredients);
        // 서버에서 dosages에 일부 키가 누락되거나 undefined가 들어와도 UI가 깨지지 않도록 보정
        const filledDosages: Record<string, number> = {
          ...(response.dosages || {}),
        };
        for (const ing of response.ingredients) {
          const v = filledDosages[ing.id];
          if (typeof v !== "number" || Number.isNaN(v)) {
            filledDosages[ing.id] = ing.recommended ?? ing.min;
          }
        }
        setDosages(filledDosages);
      } catch (err) {
        console.error("Failed to fetch dosages:", err);
        setError("권장 함량을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDosages();
  }, [
    formData.strategy,
    formData.age,
    formData.gender,
    formData.selectedTags,
    formData.symptoms,
  ]);

  // 로딩 중일 때 메시지 순환
  useEffect(() => {
    if (!loading) return;

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500); // 2.5초마다 변경

    return () => clearInterval(messageInterval);
  }, [loading]);

  const handleAdjust = (
    ingredientId: string,
    increment: number,
    max: number,
    min: number
  ) => {
    setDosages((prev) => ({
      ...prev,
      [ingredientId]: Math.max(
        min,
        Math.min(max, prev[ingredientId] + increment)
      ),
    }));
  };

  const handleSubmit = () => {
    onSubmit(dosages);
  };

  // Helper function to determine feedback state
  const getFeedbackState = (currentDosage: number, ingredient: Ingredient) => {
    const isRecommended = currentDosage === ingredient.recommended;
    const isInSafeRange =
      currentDosage >= ingredient.recommended * 0.8 &&
      currentDosage <= ingredient.safeMax;
    const isWarning = currentDosage > ingredient.safeMax;

    if (isRecommended) {
      return {
        type: "recommended" as const,
        message: `${ingredient.source} 권장 수치에 딱 맞췄어요.`,
        bgColor: "bg-[#E0EDFF]",
        textColor: "text-[#3182F6]",
        icon: Check,
        source: ingredient.source,
      };
    } else if (isWarning) {
      return {
        type: "warning" as const,
        message: "이 함량 이상은 전문가와 상담이 반드시 필요해요!",
        bgColor: "bg-[#FFF4E6]",
        textColor: "text-[#FF8A00]",
        icon: AlertTriangle,
        source: ingredient.source,
      };
    } else if (isInSafeRange) {
      return {
        type: "safe" as const,
        message: "안전한 범위 내의 함량입니다.",
        bgColor: "bg-[#F4F8FF]",
        textColor: "text-[#3182F6]",
        icon: Info,
        source: ingredient.source,
      };
    } else {
      return {
        type: "low" as const,
        message: "권장량보다 낮은 수치예요.",
        bgColor: "bg-[#F9FAFB]",
        textColor: "text-[#8B95A1]",
        icon: Info,
        source: ingredient.source,
      };
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <button onClick={onBack} className="mb-8">
          <ChevronLeft className="w-7 h-7 text-[#191F28]" />
        </button>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-[#191F28] text-[28px] leading-tight mb-3">
            {ageGroup}대 {genderText}에게
            <br />
            권장하는 기준 함량이에요.
          </h1>
          <p className="text-[#8B95A1]">
            연령과 건강 상태를 고려한 최적의 권장량입니다.
          </p>
        </motion.div>
      </div>

      {/* Ingredient Cards */}
      <div className="flex-1 px-6 overflow-y-auto pb-28">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-6 mb-2 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#8B95A1] text-sm text-center"
                >
                  {loadingMessages[currentMessageIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="text-[#8B95A1] text-xs mt-2">
              잠시만 기다려주세요
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-[#8B95A1] mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#3182F6] text-white rounded-full"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {ingredients.map((ingredient, index) => {
              const currentDosage =
                typeof dosages[ingredient.id] === "number" &&
                !Number.isNaN(dosages[ingredient.id])
                  ? dosages[ingredient.id]
                  : ingredient.recommended ?? ingredient.min;
              const denom = ingredient.max - ingredient.min;
              const rawPct =
                denom > 0
                  ? ((currentDosage - ingredient.min) / denom) * 100
                  : 0;
              const percentage = Math.max(0, Math.min(100, rawPct));
              const feedbackState = getFeedbackState(currentDosage, ingredient);
              const FeedbackIcon = feedbackState.icon;

              return (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border-2 border-[#E5E8EB] rounded-[24px] p-6"
                >
                  {/* Ingredient Header */}
                  <div className="mb-4">
                    <h3 className="text-[#191F28] text-lg mb-1">
                      {ingredient.name}
                    </h3>
                    <p className="text-[#8B95A1] text-sm">
                      {ingredient.description}
                    </p>
                  </div>

                  {/* Current Value Badge */}
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`${feedbackState.bgColor} ${feedbackState.textColor} px-5 py-2.5 rounded-full flex items-center gap-2`}
                    >
                      <FeedbackIcon
                        className="w-5 h-5"
                        strokeWidth={feedbackState.type === "warning" ? 2.5 : 3}
                      />
                      <span className="text-lg">
                        {currentDosage.toLocaleString()}
                        {ingredient.unit}
                      </span>
                      {currentDosage === ingredient.recommended && (
                        <span className="text-sm opacity-80">(권장)</span>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Feedback Area */}
                  <motion.div
                    key={feedbackState.type}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`${feedbackState.bgColor} ${feedbackState.textColor} rounded-[20px] p-4 mb-4`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-8 h-8 ${
                          feedbackState.type === "warning"
                            ? "bg-[#FF8A00]"
                            : "bg-[#3182F6]"
                        } rounded-full flex items-center justify-center`}
                      >
                        <FeedbackIcon
                          className="w-4 h-4 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`${
                            feedbackState.type === "warning"
                              ? "text-[#191F28]"
                              : "text-[#191F28]"
                          } text-sm leading-relaxed mb-2`}
                        >
                          {feedbackState.message}
                        </p>
                        {/* Trust Badge / Source Citation */}
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck
                            className={`w-3.5 h-3.5 ${feedbackState.textColor}`}
                          />
                          <span
                            className={`text-xs ${feedbackState.textColor} opacity-75`}
                          >
                            출처: {feedbackState.source}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Track Bar Visualizer */}
                  <div className="mb-4">
                    <div className="relative h-3 bg-[#F0F0F0] rounded-full overflow-hidden">
                      {/* Progress segment - color changes based on state */}
                      <motion.div
                        className={`absolute left-0 top-0 h-full rounded-full ${
                          feedbackState.type === "warning"
                            ? "bg-[#FF8A00]"
                            : "bg-[#3182F6]"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      />
                      {/* Marker at current position */}
                      <motion.div
                        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md ${
                          feedbackState.type === "warning"
                            ? "border-3 border-[#FF8A00]"
                            : "border-3 border-[#3182F6]"
                        }`}
                        initial={{ left: 0 }}
                        animate={{ left: `${percentage}%` }}
                        style={{ transform: `translate(-50%, -50%)` }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      />
                    </div>

                    {/* Range Labels */}
                    <div className="flex items-center justify-between mt-2 text-xs text-[#8B95A1]">
                      <span>
                        {ingredient.min}
                        {ingredient.unit}
                      </span>
                      <span>
                        {ingredient.max}
                        {ingredient.unit}
                      </span>
                    </div>
                  </div>

                  {/* Adjustment Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() =>
                        handleAdjust(
                          ingredient.id,
                          -50,
                          ingredient.max,
                          ingredient.min
                        )
                      }
                      className="w-10 h-10 rounded-full bg-[#F9FAFB] border border-[#E5E8EB] flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <Minus className="w-4 h-4 text-[#8B95A1]" />
                    </button>
                    <div className="text-[#8B95A1] text-sm min-w-[100px] text-center">
                      함량 조절 가능
                    </div>
                    <button
                      onClick={() =>
                        handleAdjust(
                          ingredient.id,
                          50,
                          ingredient.max,
                          ingredient.min
                        )
                      }
                      className="w-10 h-10 rounded-full bg-[#F9FAFB] border border-[#E5E8EB] flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <Plus className="w-4 h-4 text-[#8B95A1]" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom CTA - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E8EB] p-6">
        <div className="max-w-[390px] mx-auto">
          <button
            onClick={handleSubmit}
            disabled={loading || error !== null}
            className={`w-full py-5 rounded-[24px] active:scale-[0.98] transition-transform ${
              loading || error !== null
                ? "bg-[#E5E8EB] text-[#8B95A1] cursor-not-allowed"
                : "bg-[#3182F6] text-white"
            }`}
          >
            이 함량으로 제품 조합 보기
          </button>
        </div>
      </div>
    </div>
  );
}
