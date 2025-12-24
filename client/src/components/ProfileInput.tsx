import { useMemo, useState } from "react";
import { ChevronLeft, Plus, Minus } from "lucide-react";

interface ProfileInputProps {
  onSubmit: (gender: string, age: number) => void;
  onBack: () => void;
}

export function ProfileInput({ onSubmit, onBack }: ProfileInputProps) {
  const [gender, setGender] = useState("");
  // 기본값: 과하게 고정된 값(예: 40) 대신, 일반적인 시작점으로 30을 사용
  const [age, setAge] = useState(30);
  const [ageInput, setAgeInput] = useState<string>("30");

  const clampAge = (n: number) => Math.max(1, Math.min(120, n));

  const normalizedAge = useMemo(() => clampAge(age), [age]);

  const handleSubmit = () => {
    if (!gender) return;
    const parsed = Number.parseInt(ageInput, 10);
    const nextAge = Number.isFinite(parsed) ? clampAge(parsed) : normalizedAge;
    setAge(nextAge);
    setAgeInput(String(nextAge));
    onSubmit(gender, nextAge);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <button onClick={onBack} className="mb-8">
          <ChevronLeft className="w-7 h-7 text-[#191F28]" />
        </button>
        <h1 className="text-[#191F28] text-[32px] leading-tight">
          연령대와 성별을
          <br />
          알려주세요.
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col">
        {/* Gender Selection */}
        <div className="mb-10">
          <label className="text-[#8B95A1] text-sm mb-3 block">성별</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setGender("male")}
              className={`py-5 rounded-[24px] transition-all ${
                gender === "male"
                  ? "bg-[#3182F6] text-white"
                  : "bg-white border-2 border-[#E5E8EB] text-[#191F28]"
              }`}
            >
              남성
            </button>
            <button
              onClick={() => setGender("female")}
              className={`py-5 rounded-[24px] transition-all ${
                gender === "female"
                  ? "bg-[#3182F6] text-white"
                  : "bg-white border-2 border-[#E5E8EB] text-[#191F28]"
              }`}
            >
              여성
            </button>
          </div>
        </div>

        {/* Age Input */}
        <div className="mb-10">
          <label className="text-[#8B95A1] text-sm mb-3 block">나이</label>
          <div className="bg-white border-2 border-[#E5E8EB] rounded-[24px] p-8 flex items-center justify-between">
            <button
              onClick={() => {
                const next = clampAge(normalizedAge - 1);
                setAge(next);
                setAgeInput(String(next));
              }}
              className="w-14 h-14 rounded-full bg-[#F4F8FF] flex items-center justify-center active:scale-95 transition-transform"
            >
              <Minus className="w-6 h-6 text-[#3182F6]" />
            </button>
            <div className="flex flex-col items-center gap-2">
              <input
                value={ageInput}
                onChange={(e) => {
                  const v = e.target.value;
                  // 숫자만(빈 문자열 허용)
                  if (!/^\d*$/.test(v)) return;
                  setAgeInput(v);
                  if (v === "") return;
                  const parsed = Number.parseInt(v, 10);
                  if (Number.isFinite(parsed)) setAge(clampAge(parsed));
                }}
                onBlur={() => {
                  const parsed = Number.parseInt(ageInput, 10);
                  const next =
                    ageInput === "" || !Number.isFinite(parsed)
                      ? normalizedAge
                      : clampAge(parsed);
                  setAge(next);
                  setAgeInput(String(next));
                }}
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-[140px] text-center text-[#191F28] text-7xl tabular-nums outline-none bg-transparent"
                aria-label="나이 입력"
              />
              <div className="text-[#8B95A1] text-sm">직접 입력 가능</div>
            </div>
            <button
              onClick={() => {
                const next = clampAge(normalizedAge + 1);
                setAge(next);
                setAgeInput(String(next));
              }}
              className="w-14 h-14 rounded-full bg-[#F4F8FF] flex items-center justify-center active:scale-95 transition-transform"
            >
              <Plus className="w-6 h-6 text-[#3182F6]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-6">
        <button
          onClick={handleSubmit}
          disabled={!gender}
          className={`w-full py-5 rounded-[24px] transition-all ${
            gender
              ? "bg-[#3182F6] text-white active:scale-[0.98]"
              : "bg-[#E5E8EB] text-[#8B95A1]"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
