interface ProgressProps {
  currentAmount: number;
  goalAmount: number;
}

export default function DonationProgress({ currentAmount, goalAmount }: ProgressProps) {
  const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);

  return (
    <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Raised so far</h4>
          <p className="text-2xl font-bold text-slate-900">KES {currentAmount.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {progressPercentage.toFixed(2)}% of Goal
          </span>
        </div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-right">Goal: KES {goalAmount.toLocaleString()}</p>
    </div>
  );
}