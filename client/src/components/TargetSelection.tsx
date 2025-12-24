import { User, Users, Heart, Baby } from 'lucide-react';

interface TargetSelectionProps {
  onSelect: (target: string) => void;
}

export function TargetSelection({ onSelect }: TargetSelectionProps) {
  const targets = [
    { id: 'me', label: '나', sublabel: 'Me', icon: User },
    { id: 'parents', label: '부모님', sublabel: 'Parents', icon: Users },
    { id: 'spouse', label: '배우자', sublabel: 'Spouse', icon: Heart },
    { id: 'child', label: '자녀', sublabel: 'Child', icon: Baby },
  ];

  return (
    <div className="h-full flex flex-col px-6 pt-16 pb-8">
      <div className="mb-12">
        <h1 className="text-[#191F28] text-[32px] leading-tight">
          누구를 위한
          <br />
          영양제인가요?
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {targets.map((target) => {
          const Icon = target.icon;
          return (
            <button
              key={target.id}
              onClick={() => onSelect(target.id)}
              className="aspect-square bg-white border-2 border-[#E5E8EB] rounded-[24px] flex flex-col items-center justify-center gap-3 hover:border-[#3182F6] hover:bg-[#F4F8FF] transition-all active:scale-95"
            >
              <Icon className="w-12 h-12 text-[#3182F6]" strokeWidth={1.5} />
              <div>
                <div className="text-[#191F28] text-xl">{target.label}</div>
                <div className="text-[#8B95A1] text-sm">{target.sublabel}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
