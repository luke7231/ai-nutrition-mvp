import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  // 날짜 계산 함수
  const getDateString = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 통계 데이터 (실제로는 API에서 가져올 수 있음)
  const stats = {
    today: 127,
    yesterday: 89,
    total: 15420,
    thisWeek: 856,
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] min-h-[844px] bg-white relative overflow-hidden flex flex-col">
        {/* 베타 오픈 배지 */}
        <div className="absolute top-6 right-6">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            베타 오픈
          </span>
        </div>

        {/* 타이틀과 버튼 그룹 - 중앙 배치 */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                영양제 뭐가 맞을까
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                증상만 말하세요!
                <br />
                최고의 조합은 이미 다 찾아놨어요
              </p>
            </div>
            <div className="mb-8">
              <div className="bg-gray-50 rounded-2xl px-4 py-3 inline-block">
                <span className="text-sm text-gray-600">
                  오늘까지 학습한 영양학논문{" "}
                </span>
                <span className="text-base font-bold text-gray-900">
                  {stats.total.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="space-y-3 mb-12">
              <button
                onClick={() => navigate("/analysis")}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-colors active:scale-[0.98]"
              >
                시작하기
              </button>
              <button
                onClick={() => alert("준비중입니다")}
                className="w-full bg-white underline text-gray-500 py-2.5 font-medium text-sm hover:bg-gray-50 transition-colors active:scale-[0.98]"
              >
                제품 비교
              </button>
            </div>
            {/* 예시 질문 Ticker */}
            <div>
              <div className="ticker-container">
                <div className="ticker-content">
                  <div className="ticker-item">배우자 영양제 뭐챙겨주지?</div>
                  <div className="ticker-item">
                    부모님 골다공증에 좋은 건 뭘까?
                  </div>
                  <div className="ticker-item">피로감 완화 영양제 추천해줘</div>
                  <div className="ticker-item">면역력 향상 영양제는?</div>
                  {/* 무한 반복을 위한 복제 */}
                  <div className="ticker-item">배우자 영양제 뭐챙겨주지?</div>
                  <div className="ticker-item">
                    부모님 골다공증에 좋은 건 뭘까?
                  </div>
                  <div className="ticker-item">피로감 완화 영양제 추천해줘</div>
                  <div className="ticker-item">면역력 향상 영양제는?</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 논문 저널 학습 통계 */}
        <div className="px-6 pb-8">
          <div className="w-full bg-gray-50 rounded-2xl p-5">
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-sm font-semibold text-gray-700">
                실시간 학습 현황
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  오늘 ({getDateString(0)})
                </span>
                <span className="text-base font-bold text-gray-900">
                  {stats.today.toLocaleString()}개
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  어제 ({getDateString(1)})
                </span>
                <span className="text-base font-bold text-gray-900">
                  {stats.yesterday.toLocaleString()}개
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">누적 학습 논문</span>
                  <span className="text-base font-bold text-blue-600">
                    {stats.total.toLocaleString()}개
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
