"use client";

import { Plus, Edit2, Trash2, GripVertical, Check, X } from "lucide-react";
import { useState } from "react";
import AdminModal from "@/src/components/admin/AdminModal";

export default function AdminServices() {
  const initialServices = [
    {
      id: 1,
      name: "General Checkup & Cleaning",
      category: "Preventive",
      price: "$120 - $150",
      duration: "45 mins",
      active: true,
    },
    {
      id: 2,
      name: "Teeth Whitening",
      category: "Cosmetic",
      price: "$300 - $500",
      duration: "60 mins",
      active: true,
    },
    {
      id: 3,
      name: "Dental Implants",
      category: "Restorative",
      price: "$3,000+",
      duration: "Varies",
      active: true,
    },
    {
      id: 4,
      name: "Orthodontics (Braces)",
      category: "Orthodontics",
      price: "$4,000 - $6,000",
      duration: "Varies",
      active: true,
    },
    {
      id: 5,
      name: "Root Canal Therapy",
      category: "Endodontics",
      price: "$800 - $1,200",
      duration: "90 mins",
      active: false,
    },
  ];

  const [services, setServices] = useState(initialServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const handleSaveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      id: editingService
        ? editingService.id
        : Math.floor(Math.random() * 10000),
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: formData.get("price") as string,
      duration: formData.get("duration") as string,
      active: formData.get("active") === "true",
    };

    if (editingService) {
      setServices(
        services.map((s) => (s.id === serviceData.id ? serviceData : s)),
      );
    } else {
      setServices([...services, serviceData]);
    }

    setModalOpen(false);
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingService(null);
    setModalOpen(true);
  };

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

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="w-10 px-4 py-4"></th>
                <th className="px-4 py-4 font-medium">
                  Service Name & Category
                </th>
                <th className="px-4 py-4 font-medium">Pricing Range</th>
                <th className="px-4 py-4 font-medium">Est. Duration</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {services.map((service) => (
                <tr
                  key={service.id}
                  className={`hover:bg-slate-50/50 transition-colors ${!service.active ? "opacity-70" : ""}`}
                >
                  <td className="px-4 py-4 cursor-move text-slate-300 hover:text-slate-500">
                    <GripVertical className="w-4 h-4" />
                  </td>
                  <td className="px-4 py-4">
                    <p
                      className={`font-medium ${service.active ? "text-slate-800" : "text-slate-500"}`}
                    >
                      {service.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {service.category}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-slate-600 font-medium">
                    {service.price}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {service.duration}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 transition-colors ${
                        service.active
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                      }`}
                      onClick={() =>
                        setServices(
                          services.map((s) =>
                            s.id === service.id
                              ? { ...s, active: !s.active }
                              : s,
                          ),
                        )
                      }
                    >
                      {service.active ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                      {service.active ? "Active" : "Inactive"}
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
                        onClick={() => handleDelete(service.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
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
      >
        <form onSubmit={handleSaveService} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Service Name
            </label>
            <input
              name="name"
              defaultValue={editingService?.name}
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <input
              name="category"
              defaultValue={editingService?.category}
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
                defaultValue={editingService?.price}
                type="text"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Est. Duration
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
                editingService ? String(editingService.active) : "true"
              }
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90"
            >
              Save Service
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
