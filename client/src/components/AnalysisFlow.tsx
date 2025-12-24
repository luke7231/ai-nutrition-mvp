import { useState } from "react";
import { TargetSelection } from "./TargetSelection";
import { ProfileInput } from "./ProfileInput";
import { SymptomSuggestions } from "./SymptomSuggestions";
import { LoadingState } from "./LoadingState";
import { StrategySelection } from "./StrategySelection";
import { IngredientDosage } from "./IngredientDosage";
import { FinalReport } from "./FinalReport";
import { SetDetailPage } from "./SetDetailPage";
import { api } from "../api/client";
import type { AnalyzeResponse, BundleSet } from "../api/types";

export function AnalysisFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState<BundleSet | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(
    null
  );
  const [formData, setFormData] = useState({
    target: "",
    gender: "",
    age: 30,
    symptoms: [] as string[],
    strategy: "" as "light" | "full" | "",
    dosages: {} as Record<string, number>,
    selectedTags: [] as string[],
  });

  const handleTargetSelect = (target: string) => {
    setFormData({ ...formData, target });
    setCurrentStep(2);
  };

  const handleProfileSubmit = (gender: string, age: number) => {
    setFormData({ ...formData, gender, age });
    setCurrentStep(3);
  };

  const handleSymptomsSubmit = async (symptoms: string[]) => {
    setFormData({ ...formData, symptoms });
    setCurrentStep(4);

    try {
      const result = await api.analyze(
        formData.age,
        formData.gender as "male" | "female",
        symptoms
      );
      setAnalysisResult(result);
      setCurrentStep(5);
    } catch (error) {
      console.error("Analysis failed:", error);
      // 에러 발생 시 Step 3로 돌아가기
      setCurrentStep(3);
      alert("분석에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleStrategySelect = (strategy: "light" | "full") => {
    const selectedStrategy = analysisResult?.strategies.find(
      (s) => s.id === strategy
    );
    const selectedIngredientIds =
      selectedStrategy?.selected_ingredient_ids ??
      selectedStrategy?.selected_tags ??
      [];
    setFormData({
      ...formData,
      strategy,
      // Step5에서 선택한 성분(IDs)을 Step6로 이어주기 위해 저장
      selectedTags: selectedIngredientIds,
    });
    setCurrentStep(6);
  };

  const handleDosageSubmit = (dosages: Record<string, number>) => {
    setFormData({ ...formData, dosages });
    setCurrentStep(7);
  };

  const handleBundleSelect = (bundle: BundleSet) => {
    setSelectedBundle(bundle);
    setCurrentStep(8);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelectedBundle(null);
    setAnalysisResult(null);
    setFormData({
      target: "",
      gender: "",
      age: 30,
      symptoms: [],
      strategy: "",
      dosages: {},
      selectedTags: [],
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] min-h-[844px] bg-white relative overflow-hidden">
        {currentStep === 1 && <TargetSelection onSelect={handleTargetSelect} />}
        {currentStep === 2 && (
          <ProfileInput
            onSubmit={handleProfileSubmit}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && (
          <SymptomSuggestions
            age={formData.age}
            gender={formData.gender}
            onSubmit={handleSymptomsSubmit}
            onBack={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 4 && <LoadingState />}
        {currentStep === 5 && analysisResult && (
          <StrategySelection
            formData={formData}
            analysisResult={analysisResult}
            onSelect={handleStrategySelect}
          />
        )}
        {currentStep === 6 && (
          <IngredientDosage
            formData={formData}
            onSubmit={handleDosageSubmit}
            onBack={() => setCurrentStep(5)}
          />
        )}
        {currentStep === 7 && (
          <FinalReport
            formData={formData}
            onRestart={handleRestart}
            onBundleSelect={handleBundleSelect}
          />
        )}
        {currentStep === 8 && selectedBundle && (
          <SetDetailPage
            bundle={selectedBundle}
            userDosages={formData.dosages}
            onBack={() => setCurrentStep(7)}
          />
        )}
      </div>
    </div>
  );
}
