import { motion } from "motion/react";
import { Sparkles, Zap, Shield } from "lucide-react";
import type { AnalyzeResponse } from "../api/types";

interface StrategySelectionProps {
  formData: {
    target: string;
    gender: string;
    age: number;
    symptoms: string[];
  };
  analysisResult: AnalyzeResponse;
  onSelect: (strategy: "light" | "full") => void;
}

export function StrategySelection({
  formData,
  analysisResult,
  onSelect,
}: StrategySelectionProps) {
  const targetName =
    formData.target === "parents"
      ? formData.gender === "female"
        ? "어머님"
        : formData.gender === "male"
        ? "아버님"
        : "부모님"
      : "회원님";
  
  const lightStrategy = analysisResult.strategies.find((s) => s.id === "light");
  const fullStrategy = analysisResult.strategies.find((s) => s.id === "full");
  
  // "성분"은 summary 문자열 파싱이 아니라 서버가 내려주는 ingredient_briefs를 신뢰합니다.
  // (LLM이 summary에 증상/문장을 섞어도 UI가 절대 증상을 성분으로 보여주지 않게)
  const primaryFrom =
    fullStrategy?.ingredient_briefs?.[0]?.name ||
    lightStrategy?.ingredient_briefs?.[0]?.name ||
    fullStrategy?.tags_text?.split("+")?.[0]?.trim() ||
    lightStrategy?.tags_text?.split("+")?.[0]?.trim() ||
    "비타민D";

  return (
    <div className="h-full flex flex-col px-6 pt-12 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#3182F6]" fill="#3182F6" />
          <span className="text-[#3182F6] text-sm">AI 분석 결과</span>
        </div>
        <h1 className="text-[#191F28] text-[28px] leading-tight mb-3">
          {targetName}에게 가장 중요한
          <br />
          성분은 <span className="text-[#3182F6]">{primaryFrom}</span>
          이에요.
        </h1>
        <p className="text-[#8B95A1]">
          {formData.symptoms[0] || "증상"}을 고려했을 때
          <br />
          우선적으로 필요한 영양소입니다.
        </p>
      </motion.div>

      {/* Strategy Cards */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Light Pack */}
        {lightStrategy && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => onSelect("light")}
            className="bg-white border-2 border-[#E5E8EB] rounded-[24px] p-6 text-left hover:border-[#3182F6] hover:bg-[#F4F8FF] transition-all active:scale-[0.98] group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#F4F8FF] rounded-full flex items-center justify-center group-hover:bg-[#E0EDFF] transition-colors">
                <Zap className="w-6 h-6 text-[#3182F6]" />
              </div>
              <div className="bg-[#F9FAFB] text-[#8B95A1] text-xs px-3 py-1.5 rounded-full">
                부담없이 시작
              </div>
            </div>
            <h3 className="text-[#191F28] text-xl mb-2">
              {lightStrategy.title}
            </h3>
            <p className="text-[#8B95A1] mb-4">{lightStrategy.description}</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#3182F6] rounded-full"></div>
              <span className="text-[#191F28] text-sm">
                {lightStrategy.tags_text}
              </span>
            </div>
            {lightStrategy.ingredient_briefs &&
              lightStrategy.ingredient_briefs.length > 0 && (
                <div className="space-y-1.5">
                  {lightStrategy.ingredient_briefs.slice(0, 5).map((b) => (
                    <div key={b.id} className="text-sm text-[#8B95A1]">
                      <span className="text-[#191F28]">{b.name}</span>
                      <span className="text-[#8B95A1]">
                        {" "}
                        — {b.whyHelpful || b.shortDescription}
                      </span>
                    </div>
                  ))}
                </div>
              )}
          </motion.button>
        )}

        {/* Full Pack - Recommended */}
        {fullStrategy && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onSelect("full")}
            className="bg-gradient-to-br from-[#E0EDFF] to-[#F4F8FF] border-2 border-[#3182F6] rounded-[24px] p-6 text-left hover:shadow-lg transition-all active:scale-[0.98] relative overflow-hidden group"
          >
            {/* Recommended Badge */}
            <div className="absolute top-4 right-4 bg-[#3182F6] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3" fill="white" />
              <span>추천</span>
            </div>

            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Sparkles className="w-6 h-6 text-[#3182F6]" fill="#3182F6" />
              </div>
            </div>
            <h3 className="text-[#191F28] text-xl mb-2">
              {fullStrategy.title}
            </h3>
            <p className="text-[#8B95A1] mb-4">{fullStrategy.description}</p>
            <div className="space-y-2 mb-3">
              {fullStrategy.tags_text.split("+").map((ingredient, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#3182F6] rounded-full"></div>
                  <span className="text-[#191F28] text-sm">
                    {idx === 0 ? ingredient.trim() : `+ ${ingredient.trim()}`}
                  </span>
                </div>
              ))}
            </div>
            {fullStrategy.ingredient_briefs &&
              fullStrategy.ingredient_briefs.length > 0 && (
                <div className="space-y-1.5">
                  {fullStrategy.ingredient_briefs.slice(0, 5).map((b) => (
                    <div key={b.id} className="text-sm text-[#8B95A1]">
                      <span className="text-[#191F28]">{b.name}</span>
                      <span className="text-[#8B95A1]">
                        {" "}
                        — {b.whyHelpful || b.shortDescription}
                      </span>
                    </div>
                  ))}
                </div>
              )}
          </motion.button>
        )}
      </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-[#8B95A1] text-sm mt-6"
      >
        언제든지 변경 가능해요
      </motion.div>
    </div>
  );
}
