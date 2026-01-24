"use client";

import { Users } from "lucide-react";
import useSWR from "swr";
import { fetchProject } from "@/lib/api";

interface LiveProps {
  initialData: {
    id: string;
    goal_amount: number;
    current_amount: number;
    total_donated?: number;
    total_donors?: number;
    progress_percentage?: number;
  };
}

export default function LiveDonationProgress({ initialData }: LiveProps) {
  // Poll every 10 seconds for new data
  const { data: project } = useSWR(
    `project-live-${initialData.id}`,
    () => fetchProject(initialData.id),
    {
      fallbackData: initialData,
      refreshInterval: 10000, // 10 seconds
    }
  );

  const donors = project.total_donors ?? 0;
  const raisedAmount = project.total_donated ?? project.current_amount;
  const progress = project.progress_percentage ?? 
    (project.goal_amount ? (raisedAmount / project.goal_amount) * 100 : 0);

  return (
    <div className="space-y-4">
      {project.goal_amount && (
        <>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-[#00b17b] h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Raised</p>
              <p className="text-2xl font-bold text-[#00b17b]">
                KES {raisedAmount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-medium">Goal</p>
              <p className="text-lg font-semibold text-[#3d2616]">
                KES {project.goal_amount.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}

      <div className="flex items-center text-sm text-muted-foreground pt-2">
        <Users className="w-4 h-4 mr-2" />
        <span className="font-medium">
          {donors === 1 ? "1 Donor" : `${donors} Donors`}
        </span>
      </div>
    </div>
  );
}