"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function ProjectForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === "new";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goal_amount: "",
    start_date: "",
    end_date: "",
    status: "ongoing",
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isNew) {
      // Fetch existing project data
      const fetchProject = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/projects/${resolvedParams.id}/`
          );
          if (res.ok) {
            const data = await res.json();
            setFormData({
              name: data.name,
              description: data.description,
              goal_amount: data.goal_amount,
              start_date: data.start_date,
              end_date: data.end_date || "",
              status: data.status,
            });
          }
        } catch (error) {
          console.error("Failed to fetch project", error);
        }
      };
      fetchProject();
    }
  }, [isNew, resolvedParams.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("goal_amount", formData.goal_amount);
    data.append("start_date", formData.start_date);
    if (formData.end_date) data.append("end_date", formData.end_date);
    data.append("status", formData.status);

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append("uploaded_images", selectedFiles[i]);
      }
    }

    const url = isNew
      ? `${process.env.NEXT_PUBLIC_API_URL}/projects/`
      : `${process.env.NEXT_PUBLIC_API_URL}/projects/${resolvedParams.id}/`;

    const method = isNew ? "POST" : "PATCH";

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type is set automatically by browser for FormData
        },
        body: data,
      });

      if (res.ok) {
        router.push("/admin/projects");
      } else {
        if (res.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/admin/login");
          return;
        }
        const errorData = await res.json();
        console.error("Save failed", errorData);
        alert(`Failed to save project: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error saving project", error);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isNew ? "Create New Project" : "Edit Project"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-2xl"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b17b] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b17b] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Amount (KES)
              </label>
              <input
                type="number"
                name="goal_amount"
                value={formData.goal_amount}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b17b] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b17b] focus:border-transparent outline-none transition-all"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="planned">Planned</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b17b] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date (Optional)
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b17b] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b17b] focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-[#00b17b] hover:file:bg-green-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Select multiple images to upload.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00b17b] text-white py-3 rounded-lg font-bold hover:bg-[#009e6d] transition-colors disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : isNew
                ? "Create Project"
                : "Update Project"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
