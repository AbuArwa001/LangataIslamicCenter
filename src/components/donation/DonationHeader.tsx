
export function DonationHeader({ projectId }: { projectId?: string }) {
  return (
    <div className="bg-slate-900 p-8 text-center text-white">
      <h3 className="text-2xl font-bold">Make a Donation</h3>
      <p className="text-slate-300 text-sm mt-1">
        {projectId
          ? "Support this specific project"
          : "Support the construction of the Langata Islamic Center"}
      </p>
    </div>
  );
}
