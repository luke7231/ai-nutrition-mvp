import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const processingMessages = [
  "가장 쉽게 알려줄 수 있도록 표현을 정리중이에요",
  "우선순위를 정리중이에요",
  "최적의 조합을 찾고 있어요",
  "개인화된 추천을 준비중이에요",
  "영양 성분을 분석중이에요",
  "맞춤형 솔루션을 구성중이에요",
];

export function LoadingState() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const maxDocuments = useRef(Math.floor(Math.random() * (500 - 12 + 1)) + 12);
  const startTime = useRef(Date.now());
  const isComplete = documentCount >= maxDocuments.current;

  useEffect(() => {
    // 경과 시간 업데이트
    const timeInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      setElapsedSeconds(elapsed);
    }, 100);

    // 문서 개수 애니메이션 (천천히 증가)
    const documentInterval = setInterval(() => {
      setDocumentCount((prev) => {
        if (prev < maxDocuments.current) {
          // 점진적으로 증가 (더 천천히)
          const remaining = maxDocuments.current - prev;
          const increment = Math.max(1, Math.floor(remaining / 30)); // 10 -> 30으로 변경하여 더 느리게
          return Math.min(prev + increment, maxDocuments.current);
        }
        return prev;
      });
    }, 50); // 50ms -> 150ms로 변경하여 더 느리게

    return () => {
      clearInterval(timeInterval);
      clearInterval(documentInterval);
    };
  }, []);

  // 문서 카운트가 완료되면 메시지 순환
  useEffect(() => {
    if (!isComplete) return;

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % processingMessages.length);
    }, 2500); // 2.5초마다 변경

    return () => clearInterval(messageInterval);
  }, [isComplete]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 pt-20">
      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-[#191F28] text-2xl mb-3">
          AI 약사가 최적의
          <br />
          조합을 찾고 있어요...
        </h2>
        <p className="text-[#8B95A1]">잠시만 기다려주세요</p>
      </motion.div>

      {/* 숫자 상승 블록 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-md mb-6"
      >
        <div className="flex items-center justify-center gap-8">
          {/* 초 카운터 */}
          <div className="text-center flex-1">
            <div className="text-[#8B95A1] text-sm mb-2">경과 시간</div>
            <div className="text-[#191F28] text-5xl font-bold tabular-nums">
              {formatNumber(elapsedSeconds)}
            </div>
            <div className="text-[#8B95A1] text-sm mt-1">초동안</div>
          </div>

          {/* 문서 개수 카운터 */}
          <div className="text-center flex-1">
            <div className="text-[#8B95A1] text-sm mb-2">분석한 문서</div>
            <div className="text-[#3182F6] text-5xl font-bold tabular-nums">
              {formatNumber(documentCount)}
            </div>
            <div className="text-[#8B95A1] text-sm mt-1">
              개의 문서를 읽었어요
            </div>
          </div>
        </div>
      </motion.div>

      {/* 로딩 메시지 (카운터 완료 후 표시) */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-[#8B95A1] text-sm text-center"
              >
                {processingMessages[currentMessageIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Progress Dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[#3182F6] rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
