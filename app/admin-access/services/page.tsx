"use client";

import {
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  Check,
  X,
  Loader2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import AdminModal from "@/src/components/admin/AdminModal";
import {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "@/src/redux/features/services/servicesApi";
import { useUploadFileMutation } from "@/src/redux/features/assets/assetsApi";
import { toast } from "sonner";

export default function AdminServices() {
  const { data: servicesData, isLoading } = useGetAllServicesQuery(undefined);
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  const services = servicesData || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  // Form states
  const [serviceImage, setServiceImage] = useState<string | null>(null);
  const [processSteps, setProcessSteps] = useState<
    { title: string; desc: string }[]
  >([{ title: "", desc: "" }]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id).unwrap();
        toast.success("Service deleted successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete service");
      }
    }
  };

  const handleToggleStatus = async (service: any) => {
    try {
      const newStatus = service.status === "active" ? "inactive" : "active";
      await updateService({
        id: service._id,
        status: newStatus,
      }).unwrap();
      toast.success(`Service is now ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await uploadFile(formData).unwrap();
        if (res?.data?.url) {
          setServiceImage(res.data.url);
          toast.success("Image uploaded successfully");
        } else if (res?.url) {
          setServiceImage(res.url);
          toast.success("Image uploaded successfully");
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
        toast.error("Failed to upload image");
      }
    }
  };

  const handleSaveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Generate simple slug from title
    const title = formData.get("name") as string;
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const specifications = formData.get("specifications") as string;
    const benefits = specifications
      ? specifications.split("\n").filter((s) => s.trim().length > 0)
      : [];

    const formattedProcess = processSteps
      .filter((p) => p.title.trim() && p.desc.trim())
      .map((p, index) => ({
        step: index + 1,
        title: p.title,
        desc: p.desc,
      }));

    if (!serviceImage) return toast.error("Please upload a service image");
    if (benefits.length === 0)
      return toast.error("Please add at least one benefit");
    if (formattedProcess.length === 0)
      return toast.error("Please add at least one process step");

    const serviceData = {
      slug,
      title,
      description: formData.get("description") as string,
      longDescription: formData.get("longDescription") as string,
      icon: editingService?.icon || "Sparkles",
      color: editingService?.color || "bg-blue-500",
      priceRange: formData.get("price") as string,
      duration: formData.get("duration") as string,
      benefits,
      process: formattedProcess,
      image: serviceImage,
      status: formData.get("active") === "true" ? "active" : "inactive",
    };

    try {
      if (editingService) {
        await updateService({
          id: editingService._id,
          ...serviceData,
        }).unwrap();
        toast.success("Service updated successfully");
      } else {
        await createService(serviceData).unwrap();
        toast.success("Service created successfully");
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save service");
    }
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setServiceImage(service.image || null);
    setProcessSteps(
      service.process?.length
        ? service.process.map((p: any) => ({ title: p.title, desc: p.desc }))
        : [{ title: "", desc: "" }],
    );
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingService(null);
    setServiceImage(null);
    setProcessSteps([{ title: "", desc: "" }]);
    setModalOpen(true);
  };

  const handleAddProcess = () => {
    setProcessSteps([...processSteps, { title: "", desc: "" }]);
  };

  const handleProcessChange = (
    index: number,
    field: "title" | "desc",
    value: string,
  ) => {
    const newSteps = [...processSteps];
    newSteps[index][field] = value;
    setProcessSteps(newSteps);
  };

  const handleRemoveProcess = (index: number) => {
    setProcessSteps(processSteps.filter((_, i) => i !== index));
  };

  const isSaving = isCreating || isUpdating;

  return (
    <div className="space-y-6 animate-fade-up min-h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Services & Pricing
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage the services offered by the clinic.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        )}
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="w-10 px-4 py-4"></th>
                <th className="px-4 py-4 font-medium">Service Name</th>
                <th className="px-4 py-4 font-medium">Pricing Range</th>
                <th className="px-4 py-4 font-medium">Est. Duration</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {services.map((service: any) => {
                const isActive = service.status === "active";
                return (
                  <tr
                    key={service._id}
                    className={`hover:bg-slate-50/50 transition-colors ${!isActive ? "opacity-70" : ""}`}
                  >
                    <td className="px-4 py-4 cursor-move text-slate-300 hover:text-slate-500">
                      <GripVertical className="w-4 h-4" />
                    </td>
                    <td className="px-4 py-4">
                      <p
                        className={`font-medium ${isActive ? "text-slate-800" : "text-slate-500"}`}
                      >
                        {service.title}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-slate-600 font-medium">
                      {service.priceRange || "$0"}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {service.duration || "N/A"}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 transition-colors ${
                          isActive
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                        }`}
                        onClick={() => handleToggleStatus(service)}
                      >
                        {isActive ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        {isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {services.length === 0 && !isLoading && (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan={6}>
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? "Edit Service" : "Add New Service"}
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleSaveService} className="space-y-6">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Service Title
                </label>
                <input
                  name="name"
                  defaultValue={editingService?.title}
                  type="text"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Price / Range
                  </label>
                  <input
                    name="price"
                    defaultValue={editingService?.priceRange}
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Duration
                  </label>
                  <input
                    name="duration"
                    defaultValue={editingService?.duration}
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  name="active"
                  defaultValue={
                    editingService && editingService.status === "inactive"
                      ? "false"
                      : "true"
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  required
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Service Image
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all relative overflow-hidden group h-32 flex flex-col items-center justify-center bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
                  ) : serviceImage ? (
                    <img
                      src={serviceImage}
                      alt="Service"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        Upload Cover
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Short Description (Subtitle)
                </label>
                <textarea
                  name="description"
                  defaultValue={editingService?.description}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm h-16 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Long Description (Detailed)
                </label>
                <textarea
                  name="longDescription"
                  defaultValue={editingService?.longDescription}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm h-24 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Benefits (One per line)
                </label>
                <textarea
                  name="specifications"
                  defaultValue={editingService?.benefits?.join("\n")}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm h-28 resize-none"
                  placeholder="e.g.&#10;Instant Results&#10;Safe for enamel"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Treatment Process Steps
              </label>
              <button
                type="button"
                onClick={handleAddProcess}
                className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-md hover:bg-primary/20"
              >
                + Add Step
              </button>
            </div>

            <div className="space-y-3">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 space-y-2">
                    <input
                      placeholder="Step Name (e.g. Consultation)"
                      value={step.title}
                      onChange={(e) =>
                        handleProcessChange(idx, "title", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                      required
                    />
                    <input
                      placeholder="Step Description"
                      value={step.desc}
                      onChange={(e) =>
                        handleProcessChange(idx, "desc", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProcess(idx)}
                    className="text-slate-400 hover:text-red-500 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Service
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
