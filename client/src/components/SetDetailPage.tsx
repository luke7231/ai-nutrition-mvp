import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Check,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { BundleSet } from "../api/types";

interface SetDetailPageProps {
  bundle: BundleSet;
  userDosages: Record<string, number>;
  onBack: () => void;
}

export function SetDetailPage({
  bundle,
  userDosages,
  onBack,
}: SetDetailPageProps) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleProduct = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  // Group products by intake time
  const morningProducts = bundle.products.filter(
    (p) => p.intakeTime === "morning" || p.intakeTime === "both"
  );
  const eveningProducts = bundle.products.filter(
    (p) => p.intakeTime === "evening" || p.intakeTime === "both"
  );

  return (
    <div className="h-full flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 sticky top-0 bg-white z-20 border-b border-[#E5E8EB]">
          <button onClick={onBack} className="mb-4">
            <ChevronLeft className="w-7 h-7 text-[#191F28]" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-[#3182F6] text-white text-xs px-3 py-1 rounded-full">
              {bundle.badge}
            </div>
          </div>
          <h1 className="text-[#191F28] text-[28px] leading-tight">
            {bundle.title}
          </h1>
        </div>

        {/* Hero Section */}
        <div className="px-6 py-8 bg-gradient-to-b from-[#F4F8FF] to-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="text-[#8B95A1] mb-2">한 달 기준 하루 비용</div>
            <div className="text-[#3182F6] text-[56px] leading-none mb-1">
              {bundle.pricing.dailyPrice.toLocaleString()}원
            </div>
            <div className="text-[#8B95A1] text-sm">
              커피 한 잔보다 저렴해요
            </div>
          </motion.div>

          {/* Product Images */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {bundle.products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-24 h-24 bg-white rounded-[16px] overflow-hidden border-2 border-[#E5E8EB] shadow-md"
              >
                <ImageWithFallback
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dosage Report Card */}
        <div className="px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#3182F6] rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <h2 className="text-[#191F28] text-xl">
                설정하신 기준을 100% 통과했어요
              </h2>
            </div>

            <div className="bg-[#F9FAFB] rounded-[24px] p-6">
              <div className="space-y-4">
                {bundle.products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-[16px] p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#191F28]">
                        {product.ingredient}
                      </span>
                      <div className="flex items-center gap-1.5 bg-[#E0EDFF] text-[#3182F6] px-3 py-1 rounded-full">
                        <Check className="w-4 h-4" strokeWidth={3} />
                        <span className="text-sm">Perfect Match</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-2">
                      <div>
                        <div className="text-[#8B95A1] mb-1">회원님 목표</div>
                        <div className="text-[#191F28]">
                          {userDosages[
                            product.ingredientId
                          ]?.toLocaleString() ||
                            product.dailyDosage.toLocaleString()}
                          mg
                        </div>
                      </div>
                      <div className="text-[#8B95A1]">→</div>
                      <div>
                        <div className="text-[#8B95A1] mb-1">
                          이 조합 제공량
                        </div>
                        <div className="text-[#3182F6]">
                          {product.dailyDosage.toLocaleString()}mg
                        </div>
                      </div>
                    </div>

                    <div className="h-2 bg-[#E5E8EB] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#3182F6] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Included Products (Accordion) */}
        <div className="px-6 py-8 bg-[#F9FAFB]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-[#191F28] text-xl mb-4">
              포함된 제품 ({bundle.products.length}개)
            </h2>

            <div className="space-y-3">
              {bundle.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[20px] overflow-hidden border border-[#E5E8EB]"
                >
                  <button
                    onClick={() => toggleProduct(product.id)}
                    className="w-full p-5 flex items-center gap-4 active:bg-[#F9FAFB] transition-colors"
                  >
                    <div className="w-16 h-16 bg-[#F9FAFB] rounded-[12px] overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-[#191F28] mb-1">{product.name}</div>
                      <div className="text-[#8B95A1] text-sm">
                        {product.brand}
                      </div>
                    </div>
                    <div className="text-[#191F28]">
                      {product.price.toLocaleString()}원
                    </div>
                    <div className="text-[#8B95A1]">
                      {expandedProduct === product.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedProduct === product.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-[#E5E8EB] pt-4">
                          <div className="space-y-3 mb-4">
                            <div>
                              <div className="text-[#8B95A1] text-sm mb-1">
                                주요 성분
                              </div>
                              <div className="text-[#191F28]">
                                {product.ingredient} {product.dailyDosage}mg
                              </div>
                            </div>
                            <div>
                              <div className="text-[#8B95A1] text-sm mb-1">
                                섭취 방법
                              </div>
                              <div className="text-[#191F28]">
                                1일 {product.pillsPerDay}알,{" "}
                                {product.intakeTime === "morning"
                                  ? "아침"
                                  : product.intakeTime === "evening"
                                  ? "저녁"
                                  : "아침/저녁"}{" "}
                                식사 후
                              </div>
                            </div>
                            <div>
                              <div className="text-[#8B95A1] text-sm mb-2">
                                제품 특징
                              </div>
                              <div className="space-y-1">
                                {product.features.map((feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <Check
                                      className="w-4 h-4 text-[#3182F6] mt-0.5 flex-shrink-0"
                                      strokeWidth={2.5}
                                    />
                                    <span className="text-[#191F28] text-sm">
                                      {feature}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Buy Button */}
                          <button
                            onClick={() => {
                              if (product.productUrl) {
                                window.open(product.productUrl, "_blank");
                              } else {
                                alert("구매 링크가 준비되지 않았습니다.");
                              }
                            }}
                            className="w-full bg-[#3182F6] text-white py-3.5 rounded-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>구매하러가기</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#E5E8EB] p-6 shadow-2xl z-30">
        <div className="max-w-[390px] mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="text-[#8B95A1] text-sm line-through mb-1">
              {bundle.pricing.totalPrice.toLocaleString()}원
            </div>
            <div className="text-[#191F28] text-xl">
              {bundle.pricing.monthlyPrice.toLocaleString()}원
            </div>
          </div>
          <button
            onClick={() => {
              const productUrls = bundle.products
                .map((p) => p.productUrl)
                .filter((url): url is string => !!url);

              if (productUrls.length === 0) {
                alert("구매 링크가 준비되지 않았습니다.");
                return;
              }

              // 모든 제품 URL을 새 탭에서 열기
              productUrls.forEach((url) => {
                window.open(url, "_blank");
              });
            }}
            className="bg-[#3182F6] text-white px-8 py-4 rounded-[20px] flex items-center gap-2 active:scale-[0.98] transition-transform flex-shrink-0"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-lg">구매하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
