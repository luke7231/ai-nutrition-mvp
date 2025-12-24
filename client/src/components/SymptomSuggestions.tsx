import { useState, useEffect } from "react";
import {
  ChevronLeft,
  Plus,
  Sparkles,
  Droplet,
  Activity,
  Heart,
  AlertCircle,
  Moon,
  Brain,
  Eye,
  Shield,
  Zap,
  TrendingDown,
  Baby,
  Smile,
  Dumbbell,
  Pill,
  Flame,
  Target,
  Leaf,
} from "lucide-react";
import { api } from "../api/client";

interface SymptomSuggestionsProps {
  age: number;
  gender: string;
  onSubmit: (symptoms: string[]) => void;
  onBack: () => void;
}

export function SymptomSuggestions({
  age,
  gender,
  onSubmit,
  onBack,
}: SymptomSuggestionsProps) {
  const ageGroup = Math.floor(age / 10) * 10;
  const genderText = gender === "male" ? "남성" : "여성";

  const [suggestedSymptoms, setSuggestedSymptoms] = useState<string[]>([]);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.suggestSymptoms(
          age,
          gender as "male" | "female"
        );
        setSuggestedSymptoms(response.symptoms);
        // 기본 선택: 상위 1개
        setSelectedSymptom(response.symptoms[0] ?? null);
      } catch (err) {
        console.error("Failed to fetch symptoms:", err);
        setError("증상을 불러오는데 실패했습니다.");
        // Fallback to empty array
        setSuggestedSymptoms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, [age, gender]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptom((prev) => (prev === symptom ? null : symptom));
  };

  // 증상별 아이콘과 친근한 문장 매핑
  const getSymptomDisplay = (symptom: string) => {
    const symptomMap: Record<string, { icon: React.ReactNode; text: string }> =
      {
        항산화: {
          icon: <Sparkles className="w-5 h-5" />,
          text: "항산화를 챙기고 싶어요!",
        },
        "피부 보습": {
          icon: <Droplet className="w-5 h-5" />,
          text: "피부 보습을 조금 더 챙기고 싶어요!",
        },
        "체지방 감소": {
          icon: <TrendingDown className="w-5 h-5" />,
          text: "체지방 감소가 고민이에요",
        },
        "임신 준비": {
          icon: <Baby className="w-5 h-5" />,
          text: "임신 준비를 하고 있어요",
        },
        "빈혈 예방": {
          icon: <Heart className="w-5 h-5" />,
          text: "빈혈 예방이 걱정이에요",
        },
        "피로 회복": {
          icon: <Zap className="w-5 h-5" />,
          text: "피로 회복이 필요해요",
        },
        "근육 건강": {
          icon: <Dumbbell className="w-5 h-5" />,
          text: "근육 건강을 관리하고 싶어요",
        },
        "눈 건강": {
          icon: <Eye className="w-5 h-5" />,
          text: "눈 건강이 걱정이에요",
        },
        "숙취 해소": {
          icon: <Pill className="w-5 h-5" />,
          text: "숙취 해소가 필요해요",
        },
        "스트레스 완화": {
          icon: <Smile className="w-5 h-5" />,
          text: "스트레스 완화가 필요해요",
        },
        "피부 건강": {
          icon: <Droplet className="w-5 h-5" />,
          text: "피부 건강을 챙기고 싶어요",
        },
        다이어트: {
          icon: <Activity className="w-5 h-5" />,
          text: "다이어트가 고민이에요",
        },
        "변비 개선": {
          icon: <Leaf className="w-5 h-5" />,
          text: "변비 개선이 필요해요",
        },
        "월경 전 증후군": {
          icon: <Heart className="w-5 h-5" />,
          text: "월경 전 증후군이 걱정이에요",
        },
        "만성 피로": {
          icon: <Zap className="w-5 h-5" />,
          text: "만성 피로가 고민이에요",
        },
        "간 건강": {
          icon: <Shield className="w-5 h-5" />,
          text: "간 건강을 관리하고 싶어요",
        },
        "탈모 관리": {
          icon: <Target className="w-5 h-5" />,
          text: "탈모 관리가 필요해요",
        },
        "체력 증진": {
          icon: <Dumbbell className="w-5 h-5" />,
          text: "체력 증진이 필요해요",
        },
        콜레스테롤: {
          icon: <Heart className="w-5 h-5" />,
          text: "콜레스테롤 관리가 걱정이에요",
        },
        "혈압 관리": {
          icon: <Activity className="w-5 h-5" />,
          text: "혈압 관리가 필요해요",
        },
        "전립선 건강": {
          icon: <Shield className="w-5 h-5" />,
          text: "전립선 건강이 걱정이에요",
        },
        "눈 침침함": {
          icon: <Eye className="w-5 h-5" />,
          text: "눈 침침함이 고민이에요",
        },
        "체력 저하": {
          icon: <Zap className="w-5 h-5" />,
          text: "체력 저하가 걱정이에요",
        },
        "복부 비만": {
          icon: <TrendingDown className="w-5 h-5" />,
          text: "복부 비만이 고민이에요",
        },
        "갱년기 초기": {
          icon: <Flame className="w-5 h-5" />,
          text: "갱년기 초기 증상이 걱정이에요",
        },
        골밀도: {
          icon: <Shield className="w-5 h-5" />,
          text: "골밀도 관리가 필요해요",
        },
        "혈행 개선": {
          icon: <Activity className="w-5 h-5" />,
          text: "혈행 개선이 필요해요",
        },
        "탄력 저하": {
          icon: <Droplet className="w-5 h-5" />,
          text: "탄력 저하가 고민이에요",
        },
        우울감: {
          icon: <Smile className="w-5 h-5" />,
          text: "우울감이 걱정이에요",
        },
        "전립선 비대": {
          icon: <Shield className="w-5 h-5" />,
          text: "전립선 비대가 걱정이에요",
        },
        "관절 통증": {
          icon: <AlertCircle className="w-5 h-5" />,
          text: "관절 통증이 고민이에요",
        },
        "기억력 감퇴": {
          icon: <Brain className="w-5 h-5" />,
          text: "기억력 감퇴가 걱정이에요",
        },
        "심혈관 건강": {
          icon: <Heart className="w-5 h-5" />,
          text: "심혈관 건강을 관리하고 싶어요",
        },
        면역력: {
          icon: <Shield className="w-5 h-5" />,
          text: "면역력 향상이 필요해요",
        },
        "갱년기 장애": {
          icon: <Flame className="w-5 h-5" />,
          text: "갱년기 장애가 걱정이에요",
        },
        "골다공증 예방": {
          icon: <Shield className="w-5 h-5" />,
          text: "골다공증 예방이 필요해요",
        },
        "관절 건강": {
          icon: <Target className="w-5 h-5" />,
          text: "관절 건강을 관리하고 싶어요",
        },
        "수면 장애": {
          icon: <Moon className="w-5 h-5" />,
          text: "수면 장애가 고민이에요",
        },
        "안면 홍조": {
          icon: <Flame className="w-5 h-5" />,
          text: "안면 홍조가 걱정이에요",
        },
        "기력 저하": {
          icon: <Zap className="w-5 h-5" />,
          text: "기력 저하가 걱정이에요",
        },
        "치매 예방": {
          icon: <Brain className="w-5 h-5" />,
          text: "치매 예방이 필요해요",
        },
        "청력 보호": {
          icon: <Shield className="w-5 h-5" />,
          text: "청력 보호가 걱정이에요",
        },
        "배뇨 장애": {
          icon: <AlertCircle className="w-5 h-5" />,
          text: "배뇨 장애가 고민이에요",
        },
        근감소증: {
          icon: <Dumbbell className="w-5 h-5" />,
          text: "근감소증 예방이 필요해요",
        },
        "퇴행성 관절염": {
          icon: <AlertCircle className="w-5 h-5" />,
          text: "퇴행성 관절염이 걱정이에요",
        },
        "뇌 건강": {
          icon: <Brain className="w-5 h-5" />,
          text: "뇌 건강을 관리하고 싶어요",
        },
        요실금: {
          icon: <AlertCircle className="w-5 h-5" />,
          text: "요실금이 고민이에요",
        },
        "노화 방지": {
          icon: <Sparkles className="w-5 h-5" />,
          text: "노화 방지를 챙기고 싶어요",
        },
      };

    // 매핑에 있으면 사용, 없으면 기본값
    const mapped = symptomMap[symptom];
    if (mapped) {
      return mapped;
    }

    // 기본값: 증상명을 친근한 문장으로 변환
    return {
      icon: <Heart className="w-5 h-5" />,
      text: `${symptom}이(가) 고민이에요`,
    };
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <button onClick={onBack} className="mb-8">
          <ChevronLeft className="w-7 h-7 text-[#191F28]" />
        </button>
        <h1 className="text-[#191F28] text-[28px] leading-tight">
          {ageGroup}대 {genderText}분들은
          <br />
          보통 이런 고민이 있어요.
        </h1>
        <p className="text-[#8B95A1] mt-3">
          해당하는 증상을 하나만 선택해주세요.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-[#8B95A1]">증상을 불러오는 중...</div>
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
          <>
            <div className="space-y-3 mb-6">
              {suggestedSymptoms.map((symptom) => {
                const display = getSymptomDisplay(symptom);
                const isSelected = selectedSymptom === symptom;

                return (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`w-full px-5 py-4 rounded-[20px] transition-all text-left flex items-center gap-4 ${
                      isSelected
                        ? "bg-[#E0EDFF] border-2 border-[#3182F6]"
                        : "bg-white border-2 border-[#E5E8EB] hover:border-[#3182F6]/30"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 ${
                        isSelected ? "text-[#3182F6]" : "text-[#8B95A1]"
                      }`}
                    >
                      {display.icon}
                    </div>
                    <span
                      className={`flex-1 ${
                        isSelected
                          ? "text-[#3182F6] font-medium"
                          : "text-[#191F28]"
                      }`}
                    >
                      {display.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <button className="flex items-center gap-2 text-[#8B95A1] px-4 py-3 hover:text-[#3182F6] transition-colors">
              <Plus className="w-5 h-5" />
              <span>직접 추가하기</span>
            </button>
          </>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-6">
        <button
          onClick={() => onSubmit(selectedSymptom ? [selectedSymptom] : [])}
          disabled={!selectedSymptom}
          className={`w-full py-5 rounded-[24px] transition-all ${
            selectedSymptom
              ? "bg-[#3182F6] text-white active:scale-[0.98]"
              : "bg-[#E5E8EB] text-[#8B95A1]"
          }`}
        >
          이대로 분석하기
        </button>
      </div>
    </div>
  );
}
