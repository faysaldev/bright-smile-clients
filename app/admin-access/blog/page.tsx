"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, Upload } from "lucide-react";
import AdminModal from "@/src/components/admin/AdminModal";
import RichTextEditor from "@/src/components/admin/RichTextEditor";

export default function AdminBlog() {
  const initialPosts = [
    {
      id: 1,
      title: "The Importance of Regular Dental Checkups",
      category: "General Info",
      date: "Oct 20, 2026",
      author: "Dr. Smith",
      status: "Published",
      views: 1245,
    },
    {
      id: 2,
      title: "5 Tips for a Whiter Smile",
      category: "Cosmetic",
      date: "Oct 15, 2026",
      author: "Dr. Johnson",
      status: "Published",
      views: 3421,
    },
    {
      id: 3,
      title: "Understanding Root Canals: What to Expect",
      category: "Procedures",
      date: "Oct 10, 2026",
      author: "Dr. Williams",
      status: "Draft",
      views: 0,
    },
    {
      id: 4,
      title: "How Diet Affects Your Oral Health",
      category: "Nutrition",
      date: "Oct 05, 2026",
      author: "Dr. Smith",
      status: "Published",
      views: 890,
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  // State for rich text editor and image
  const [blogContent, setBlogContent] = useState("");
  const [heroImage, setHeroImage] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleSavePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = {
      id: editingPost ? editingPost.id : Math.floor(Math.random() * 10000),
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      status: formData.get("status") as string,
      date: editingPost
        ? editingPost.date
        : new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
      views: editingPost ? editingPost.views : 0,
    };

    if (editingPost) {
      setPosts(posts.map((p) => (p.id === postData.id ? postData : p)));
    } else {
      setPosts([postData, ...posts]);
    }

    setModalOpen(false);
  };

  const openEditModal = (post: any) => {
    setEditingPost(post);
    setBlogContent(post.content || "");
    setHeroImage(post.heroImage || null);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingPost(null);
    setBlogContent("");
    setHeroImage(null);
    setModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setHeroImage(imageUrl);
    }
  };

  return (
    <div className="space-y-6 animate-fade-up min-h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Blog Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create and manage your clinic's articles.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Post Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium">Status & Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800 line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {post.views.toLocaleString()} views
                    </p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{post.author}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border w-fit ${
                          post.status === "Published"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {post.status}
                      </span>
                      <span className="text-xs text-slate-500">
                        {post.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(post)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan={5}>
                    No posts found.
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
        title={editingPost ? "Edit Post" : "Add New Post"}
        maxWidth="max-w-6xl"
      >
        <form onSubmit={handleSavePost} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Post Title
                </label>
                <input
                  name="title"
                  defaultValue={editingPost?.title}
                  type="text"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Content
                </label>
                <RichTextEditor value={blogContent} onChange={setBlogContent} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Hero Image
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors relative overflow-hidden group h-32 flex flex-col items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {heroImage ? (
                    <img
                      src={heroImage}
                      alt="Hero"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-400 mb-2 group-hover:text-primary transition-colors" />
                      <span className="text-xs text-slate-500 font-medium">
                        Click to upload image
                      </span>
                    </>
                  )}
                </div>
                {heroImage && (
                  <button
                    type="button"
                    onClick={() => setHeroImage(null)}
                    className="text-xs text-red-500 hover:underline mt-1"
                  >
                    Remove image
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <input
                  name="category"
                  defaultValue={editingPost?.category}
                  type="text"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Author
                </label>
                <input
                  name="author"
                  defaultValue={editingPost?.author}
                  type="text"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={editingPost?.status || "Draft"}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  required
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Save Post
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
