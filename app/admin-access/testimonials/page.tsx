"use client";

import { Plus, Star, Edit2, Trash2, Globe } from "lucide-react";
import { useState } from "react";
import AdminModal from "@/src/components/admin/AdminModal";

export default function AdminTestimonials() {
  const initialTestimonials = [
    {
      id: 1,
      name: "Emily Rogers",
      treatment: "Teeth Whitening",
      rating: 5,
      date: "Sep 12, 2026",
      status: "Published",
      text: "Dr. Smith and his team are incredible! My teeth have never looked better. The whole process was painless and surprisingly quick.",
    },
    {
      id: 2,
      name: "Michael Chang",
      treatment: "Dental Implants",
      rating: 5,
      date: "Aug 24, 2026",
      status: "Published",
      text: "I was very nervous about getting an implant, but the brightsmile clinic made me feel completely at ease. Highly professional.",
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      treatment: "General Checkup",
      rating: 4,
      date: "Oct 18, 2026",
      status: "Pending Review",
      text: "Good service, clean facility. I had to wait about 15 minutes past my appointment time, but the doctor was great.",
    },
  ];

  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const handlePublish = (id: number) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id ? { ...t, status: "Published" } : t,
      ),
    );
  };

  const handleSaveTestimonial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const testimonialData = {
      id: editingTestimonial
        ? editingTestimonial.id
        : Math.floor(Math.random() * 10000),
      name: formData.get("name") as string,
      treatment: formData.get("treatment") as string,
      rating: parseInt(formData.get("rating") as string),
      status: formData.get("status") as string,
      text: formData.get("text") as string,
      date: editingTestimonial
        ? editingTestimonial.date
        : new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
    };

    if (editingTestimonial) {
      setTestimonials(
        testimonials.map((t) =>
          t.id === testimonialData.id ? testimonialData : t,
        ),
      );
    } else {
      setTestimonials([testimonialData, ...testimonials]);
    }

    setModalOpen(false);
  };

  const openEditModal = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingTestimonial(null);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-up min-h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Testimonials</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage patient reviews displayed on the homepage.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
          >
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < test.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-md ${
                    test.status === "Published"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {test.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 italic line-clamp-4 leading-relaxed">
                "{test.text}"
              </p>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800 text-sm">
                  {test.name}
                </p>
                <p className="text-xs text-slate-500">
                  {test.treatment} • {test.date}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(test)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(test.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {test.status === "Pending Review" && (
              <button
                onClick={() => handlePublish(test.id)}
                className="w-full py-2.5 bg-white border-t border-slate-100 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" /> Publish to Homepage
              </button>
            )}
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="col-span-full p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-100">
            No testimonials found.
          </div>
        )}
      </div>

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
      >
        <form onSubmit={handleSaveTestimonial} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Patient Name
            </label>
            <input
              name="name"
              defaultValue={editingTestimonial?.name}
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Treatment
              </label>
              <input
                name="treatment"
                defaultValue={editingTestimonial?.treatment}
                type="text"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Rating (1-5)
              </label>
              <input
                name="rating"
                defaultValue={editingTestimonial?.rating || 5}
                min={1}
                max={5}
                type="number"
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
              name="status"
              defaultValue={editingTestimonial?.status || "Pending Review"}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              required
            >
              <option>Pending Review</option>
              <option>Published</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Review Text
            </label>
            <textarea
              name="text"
              defaultValue={editingTestimonial?.text}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm h-24 resize-none"
              required
            />
          </div>
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90"
            >
              Save Testimonial
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
