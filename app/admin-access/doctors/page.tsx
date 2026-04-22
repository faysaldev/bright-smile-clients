"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Stethoscope,
  GraduationCap,
  Briefcase,
  User,
  Image as ImageIcon,
  MoreHorizontal,
} from "lucide-react";
import AdminModal from "@/src/components/admin/AdminModal";
import { toast } from "sonner";
import {
  useGetAllDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} from "@/src/redux/features/doctors/doctorsApi";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";

export default function AdminDoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  
  const { data: doctors, isLoading } = useGetAllDoctorsQuery(undefined);
  const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation();
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    specialty: "",
    bio: "",
    image: "",
    education: [] as string[],
    experience: "",
  });

  const [eduInput, setEduInput] = useState("");

  const handleAddEducation = () => {
    if (eduInput.trim()) {
      setFormData({
        ...formData,
        education: [...formData.education, eduInput.trim()],
      });
      setEduInput("");
    }
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      specialty: "",
      bio: "",
      image: "",
      education: [],
      experience: "",
    });
    setEditingDoctor(null);
    setEduInput("");
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (doctor: any) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      role: doctor.role,
      specialty: doctor.specialty,
      bio: doctor.bio,
      image: doctor.image,
      education: doctor.education || [],
      experience: doctor.experience,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        await updateDoctor({ id: editingDoctor._id, ...formData }).unwrap();
        toast.success("Doctor updated successfully");
      } else {
        await createDoctor(formData).unwrap();
        toast.success("Doctor added successfully");
      }
      setIsModalOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoctor(id).unwrap();
        toast.success("Doctor deleted successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete doctor");
      }
    }
  };

  const filteredDoctors = doctors?.filter((doc: any) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Doctor Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your clinic specialists and their profiles.</p>
        </div>
        <Button
          onClick={handleOpenAddModal}
          className="bg-primary text-white gap-2 rounded-xl"
        >
          <Plus className="w-4 h-4" /> Add New Doctor
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Doctor</th>
                <th className="px-6 py-4 font-medium">Specialty & Role</th>
                <th className="px-6 py-4 font-medium">Experience</th>
                <th className="px-6 py-4 font-medium">Education</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doc: any) => (
                  <tr key={doc._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                          {doc.image ? (
                            <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <User className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-slate-800">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700">{doc.specialty}</p>
                      <p className="text-xs text-slate-500">{doc.role}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">
                      {doc.experience}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {doc.education?.slice(0, 2).map((edu: string, idx: number) => (
                          <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium">
                            {edu}
                          </span>
                        ))}
                        {doc.education?.length > 2 && (
                          <span className="text-[10px] text-slate-400">+{doc.education.length - 2} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(doc)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!isLoading && filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No doctors found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDoctor ? "Edit Doctor Profile" : "Add New Doctor"}
      >
        <form onSubmit={handleSubmit} className="space-y-5 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar p-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
              <Input
                placeholder="Dr. Sarah Johnson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Role</label>
              <Input
                placeholder="Senior Orthodontist"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Specialty</label>
              <Input
                placeholder="Invisalign Expert"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Experience</label>
              <Input
                placeholder="12+ Years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Bio</label>
            <textarea
              placeholder="Brief professional biography..."
              className="w-full rounded-xl border-2 border-slate-100 bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all min-h-[100px]"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Image URL</label>
            <div className="flex gap-3">
              <Input
                placeholder="https://example.com/dr-sarah.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              {formData.image && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-slate-100 shrink-0">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Education</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="DDS, Harvard University"
                value={eduInput}
                onChange={(e) => setEduInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddEducation())}
              />
              <Button type="button" onClick={handleAddEducation} variant="outline" className="shrink-0">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.education.map((edu, idx) => (
                <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 group">
                  {edu}
                  <button type="button" onClick={() => removeEducation(idx)} className="hover:text-red-500">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {formData.education.length === 0 && (
                <p className="text-xs text-slate-400 italic">No education records added yet.</p>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="rounded-xl px-10 font-bold shadow-lg shadow-primary/20"
            >
              {isCreating || isUpdating ? "Saving..." : editingDoctor ? "Update Profile" : "Create Doctor"}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
