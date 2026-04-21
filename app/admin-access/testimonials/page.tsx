"use client";

import { Plus, Star, Edit2, Trash2, Check, X, Loader2, Upload, MessageSquare } from "lucide-react";
import { useState } from "react";
import AdminModal from "@/src/components/admin/AdminModal";
import {
  useGetTestimonialsQuery,
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} from "@/src/redux/features/testimonials/testimonialsApi";
import { useUploadFileMutation } from "@/src/redux/features/assets/assetsApi";
import { toast } from "sonner";

export default function AdminTestimonials() {
  const { data: testimonialsData, isLoading } = useGetTestimonialsQuery(undefined);
  const [addTestimonial, { isLoading: isAdding }] = useAddTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  const testimonials = testimonialsData || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial? This action cannot be undone.")) {
      try {
        await deleteTestimonial(id).unwrap();
        toast.success("Testimonial removed successfully", {
          description: "Patient review has been deleted from the database.",
        });
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete testimonial");
      }
    }
  };

  const handleToggleStatus = async (item: any) => {
    try {
      const newStatus = item.status === "active" ? "inactive" : "active";
      await updateTestimonial({
        id: item._id,
        status: newStatus,
      }).unwrap();
      toast.success(`Testimonial is now ${newStatus}`, {
        icon: newStatus === "active" ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-slate-400" />,
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await uploadFile(formData).unwrap();
        // Handle various response formats from the asset API
        const imageUrl = res?.data?.url || res?.url;
        if (imageUrl) {
          setAvatarImage(imageUrl);
          toast.success("Avatar uploaded successfully");
        } else {
          throw new Error("Invalid response from asset server");
        }
      } catch (err: any) {
        toast.error("Failed to upload avatar image");
      }
    }
  };

  const handleSaveTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Validate required fields
    const name = formData.get("name") as string;
    const text = formData.get("text") as string;
    
    if (!name || !text) {
      return toast.error("Please fill in all required fields");
    }

    const testimonialData = {
      name,
      role: formData.get("role") as string || "Patient",
      rating: parseInt(formData.get("rating") as string) || 5,
      status: formData.get("status") as string,
      text,
      avatar: avatarImage || editingTestimonial?.avatar || "https://auraboost.s3.us-east-1.amazonaws.com/profile/profile.png",
    };

    try {
      if (editingTestimonial) {
        await updateTestimonial({ id: editingTestimonial._id, ...testimonialData }).unwrap();
        toast.success("Testimonial updated successfully");
      } else {
        await addTestimonial(testimonialData).unwrap();
        toast.success("New testimonial added successfully");
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save testimonial");
    }
  };

  const openEditModal = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setAvatarImage(testimonial.avatar || null);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingTestimonial(null);
    setAvatarImage(null);
    setModalOpen(true);
  };

  const isSaving = isAdding || isUpdating;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Testimonials</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Manage public reviews and their visibility on the website.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> 
          Add New Review
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-20 flex items-center justify-center rounded-2xl">
            <div className="bg-white p-4 rounded-full shadow-xl ring-1 ring-slate-100">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </div>
        )}

        {testimonials.map((test: any) => (
          <div
            key={test._id}
            className={`group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden ${test.status === 'inactive' ? 'opacity-80 grayscale-[0.3]' : ''}`}
          >
            {/* Status Badge */}
            <div className="px-5 pt-5 flex justify-between items-center">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < (test.rating || 5) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => handleToggleStatus(test)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 ${
                  test.status === "active"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100"
                    : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                }`}
              >
                {test.status === "active" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                {test.status === "active" ? "Active" : "Inactive"}
              </button>
            </div>

            {/* Testimonial Content */}
            <div className="p-5 flex-1">
              <div className="relative">
                <span className="absolute -top-2 -left-2 text-4xl text-primary/10 font-serif leading-none">"</span>
                <p className="text-slate-600 text-sm leading-relaxed italic line-clamp-5 px-1 relative z-10">
                  {test.text}
                </p>
              </div>
            </div>

            {/* Footer / Info */}
            <div className="p-5 border-t border-slate-50 bg-slate-50/50 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white shrink-0">
                  <img
                    src={test.avatar || "https://auraboost.s3.us-east-1.amazonaws.com/profile/profile.png"}
                    alt={test.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "https://auraboost.s3.us-east-1.amazonaws.com/profile/profile.png")}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{test.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{test.role || "Patient"}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(test)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                    title="Edit Review"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(test._id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && !isLoading && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No testimonials yet</h3>
            <p className="text-slate-500 mt-1 max-w-xs">Start collecting patient reviews to build trust with new visitors.</p>
            <button 
              onClick={openAddModal}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Add your first testimonial
            </button>
          </div>
        )}
      </div>

      {/* Management Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTestimonial ? "Edit Patient Review" : "Add New Testimonial"}
      >
        <form onSubmit={handleSaveTestimonial} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profile Picture</label>
              <div className="relative group w-28 h-28">
                <div className="w-full h-full rounded-full border-2 border-slate-100 overflow-hidden bg-slate-50 shadow-inner flex items-center justify-center">
                  {(avatarImage || editingTestimonial?.avatar) ? (
                    <img
                      src={avatarImage || editingTestimonial?.avatar}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-slate-300" />
                  )}
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full pointer-events-none">
                  <Upload className="w-6 h-6 text-white" />
                </div>

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full z-20">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                )}
              </div>
              <p className="text-[10px] font-semibold text-slate-400">Click to change</p>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Patient Name *
                  </label>
                  <input
                    name="name"
                    defaultValue={editingTestimonial?.name}
                    type="text"
                    placeholder="e.g. Alice Peterson"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    required
                  />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Role / Treatment
                  </label>
                  <input
                    name="role"
                    defaultValue={editingTestimonial?.role}
                    type="text"
                    placeholder="e.g. Invisalign Patient"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      name="rating"
                      defaultValue={editingTestimonial?.rating || 5}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                    >
                      {[5, 4, 3, 2, 1].map(val => (
                        <option key={val} value={val}>{val} Stars</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Publication Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingTestimonial?.status || "active"}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="active">Visible (Active)</option>
                    <option value="inactive">Hidden (Inactive)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Review Testimonial *
            </label>
            <textarea
              name="text"
              defaultValue={editingTestimonial?.text}
              placeholder="What did the patient have to say?"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm h-32 resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50 min-w-[140px] justify-center transition-all"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {editingTestimonial ? "Update Review" : "Publish Review"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
