import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  ShoppingCart,
  RefreshCw,
  Check,
  Plus,
  Crown,
  TrendingUp,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { api } from "../api/client";
import type { BundleSet } from "../api/types";

interface FinalReportProps {
  formData: {
    target: string;
    gender: string;
    age: number;
    symptoms: string[];
    strategy: "light" | "full" | "";
    dosages: Record<string, number>;
    selectedTags: string[];
  };
  onRestart: () => void;
  onBundleSelect: (bundle: any) => void;
}

export function FinalReport({
  formData,
  onRestart,
  onBundleSelect,
}: FinalReportProps) {
  const targetName =
    formData.target === "parents"
      ? formData.gender === "female"
        ? "어머님"
        : formData.gender === "male"
        ? "아버님"
        : "부모님"
      : "회원님";

  const [bundles, setBundles] = useState<BundleSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBundles = async () => {
      if (!formData.strategy || Object.keys(formData.dosages).length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await api.recommendBundles(
          formData.strategy,
          formData.selectedTags,
          formData.dosages
        );
        setBundles(response.bundles);
      } catch (err) {
        console.error("Failed to fetch bundles:", err);
        setError("제품 조합을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, [formData.strategy, formData.dosages, formData.selectedTags]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-[#8B95A1]">제품 조합을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6">
        <div className="text-[#8B95A1] mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-[#3182F6] text-white rounded-full"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // Use bundles from API response
  const bundleSets = bundles;

  const handleBundleClick = (bundle: BundleSet) => {
    onBundleSelect(bundle);
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between mb-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-6 h-6 text-[#3182F6]" fill="#3182F6" />
            <span className="text-[#3182F6]">AI 분석 완료</span>
          </motion.div>
          <button onClick={onRestart} className="text-[#8B95A1]">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        <h1 className="text-[#191F28] text-[28px] leading-tight">
          {targetName}을 위한
          <br />
          최적 조합을 찾았어요
        </h1>
      </div>

      {/* AI Comment */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#F4F8FF] rounded-[24px] p-6"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-[#3182F6] rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <div className="text-[#191F28] mb-1">AI 약사의 소견</div>
              <div className="text-[#8B95A1] text-sm">맞춤 추천 이유</div>
            </div>
          </div>
          <p className="text-[#191F28] leading-relaxed">
            {targetName}의 {formData.symptoms.join(", ")} 증상을 고려하여 최적의
            영양제 조합을 추천드립니다. 각 제품은 임상 데이터와 성분 함량을
            기준으로 선정되었습니다.
          </p>
        </motion.div>
      </div>

      {/* Bundle Set Cards */}
      <div className="px-6 pb-32">
        <div className="text-[#8B95A1] text-sm mb-4">
          {bundleSets.length}개의 최적 조합
        </div>
        <div className="space-y-4">
          {bundleSets.map((bundle, bundleIndex) => {
            const details = bundle.pricing;

            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + bundleIndex * 0.15 }}
                className={`bg-white border-2 ${
                  bundle.highlight
                    ? "border-[#3182F6] shadow-lg"
                    : "border-[#E5E8EB]"
                } rounded-[24px] p-6 relative`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-[#191F28] text-xl mb-1">
                      {bundle.title}
                    </h3>
                    <p className="text-[#8B95A1] text-sm">
                      {bundle.discount}% 할인 적용
                    </p>
                  </div>
                  <div
                    className={`${bundle.badgeColor} text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1`}
                  >
                    {bundle.highlight && (
                      <Crown className="w-3 h-3" fill="white" />
                    )}
                    <span>{bundle.badge}</span>
                  </div>
                </div>

                {/* Product Composition */}
                <div className="mb-5">
                  <div className="text-[#8B95A1] text-xs mb-3">구성 제품</div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {bundle.products.map((product, index) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-2 flex-shrink-0"
                      >
                        <div className="relative">
                          <div className="w-16 h-16 bg-[#F9FAFB] rounded-[12px] overflow-hidden border border-[#E5E8EB]">
                            <ImageWithFallback
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-[#E0EDFF] text-[#3182F6] text-[10px] px-1.5 py-0.5 rounded-full">
                            {product.ingredient}
                          </div>
                        </div>
                        {index < bundle.products.length - 1 && (
                          <Plus
                            className="w-4 h-4 text-[#8B95A1]"
                            strokeWidth={2}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dosage Fulfillment UI */}
                <div className="mb-5 bg-[#F9FAFB] rounded-[20px] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="w-4 h-4 text-[#3182F6]" strokeWidth={3} />
                    <span className="text-[#191F28] text-sm">함량 충족도</span>
                  </div>
                  <div className="space-y-3">
                    {bundle.products.map((product) => (
                      <div key={product.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[#191F28] text-sm">
                            {product.ingredient}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#3182F6] text-sm">
                              100% 충족
                            </span>
                            <Check
                              className="w-4 h-4 text-[#3182F6]"
                              strokeWidth={3}
                            />
                          </div>
                        </div>
                        <div className="h-2 bg-[#E5E8EB] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#3182F6] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3 + bundleIndex * 0.15,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[#8B95A1] text-sm line-through">
                      총 {details.totalPrice.toLocaleString()}원
                    </span>
                    <span className="text-[#FF8A00] text-sm">
                      {details.savings.toLocaleString()}원 할인
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <div>
                      <div className="text-[#8B95A1] text-xs mb-1">
                        한 달 기준
                      </div>
                      <div className="text-[#191F28] text-2xl">
                        {details.monthlyPrice.toLocaleString()}원
                      </div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="text-right">
                      <div className="text-[#8B95A1] text-xs mb-1">
                        하루 비용
                      </div>
                      <div className="text-[#3182F6] text-3xl">
                        {details.dailyPrice.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleBundleClick(bundle)}
                  className={`w-full py-4 rounded-[20px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    bundle.highlight
                      ? "bg-[#3182F6] text-white"
                      : "bg-[#F9FAFB] text-[#191F28] border-2 border-[#E5E8EB]"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>보기</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Info - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E8EB] p-6">
        <div className="max-w-[390px] mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#8B95A1] text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>더 많은 조합 보기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
