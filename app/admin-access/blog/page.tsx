"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Upload,
  Loader2,
  Search,
  X,
  CheckCircle2,
  Clock,
  User,
  Tag,
} from "lucide-react";
import AdminModal from "@/src/components/admin/AdminModal";
import RichTextEditor from "@/src/components/admin/RichTextEditor";
import {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "@/src/redux/features/blog/blogApi";
import { useUploadFileMutation } from "@/src/redux/features/assets/assetsApi";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminBlog() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { data: blogData, isLoading: fetchLoading } = useGetAllPostsQuery({
    searchTerm: search || undefined,
    category: filter === "All" ? undefined : filter,
  });

  const [createPost, { isLoading: createLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: updateLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [uploadFile, { isLoading: uploadLoading }] = useUploadFileMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<any>(null);

  // Form states
  const [blogContent, setBlogContent] = useState("");
  const [heroImage, setHeroImage] = useState<string | null>(null);

  const posts = blogData?.posts || [];

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id).unwrap();
        toast.success("Post deleted successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete post");
      }
    }
  };

  const handleSavePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Calculate read time
    const textLength = blogContent
      .replace(/<[^>]*>?/gm, "")
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const wordsPerMinute = 200;
    const readTime = Math.max(1, Math.ceil(textLength / wordsPerMinute)) + " min";

    const postData: any = {
      title,
      slug,
      readTime,
      category: formData.get("category") as string,
      excerpt: formData.get("excerpt") as string,
      content: blogContent,
      status: formData.get("status") as string,
      image: heroImage,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
      author: {
        name: formData.get("author") as string,
        role: "Chief Medical Officer",
        avatar:
          "https://res.cloudinary.com/dk3v0m35u/image/upload/q_auto/f_auto/v1776258686/Screenshot_from_2026-04-15_19-02-29_hjapjd.png",
      },
    };

    if (!postData.content) return toast.error("Content is required");
    if (!postData.image) return toast.error("Hero image is required");

    try {
      if (editingPost) {
        await updatePost({ id: editingPost._id, ...postData }).unwrap();
        toast.success("Article updated successfully");
      } else {
        await createPost(postData).unwrap();
        toast.success("Article published successfully");
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save post");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        // useUploadFileMutation and pass the image as a file key field
        const res = await uploadFile(formData).unwrap();

        // save the url from the response.url

        if (res?.data?.url) {
          setHeroImage(res.data.url);
          toast.success("Image uploaded successfully");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Upload error:", err);
        toast.error("Failed to upload image");
      }
    }
  };

  const openViewModal = (post: any) => {
    setSelectedPost(post);
    setViewModalOpen(true);
  };

  const openEditModal = (post: any) => {
    setEditingPost(post);
    setBlogContent(post.content || "");
    setHeroImage(post.image || null);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingPost(null);
    setBlogContent("");
    setHeroImage(null);
    setModalOpen(true);
  };

  const isSaving = createLoading || updateLoading;

  return (
    <div className="space-y-6 animate-fade-up min-h-full">
      {/* Header & New Post Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Plus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Blog Management
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-13">
            Design and publish professional dental articles.
          </p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <button
            onClick={openAddModal}
            className="whitespace-nowrap bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> New Article
          </button>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative">
        {fetchLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-black uppercase tracking-[0.1em]">
                <th className="px-8 py-5 border-b border-slate-100">
                  Article Details
                </th>
                <th className="px-8 py-5 border-b border-slate-100">
                  Category
                </th>
                <th className="px-8 py-5 border-b border-slate-100">Author</th>
                <th className="px-8 py-5 border-b border-slate-100">Status</th>
                <th className="px-8 py-5 border-b border-slate-100 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {posts.map((post: any) => (
                <tr
                  key={post._id}
                  className="group hover:bg-slate-50/80 transition-all"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 group-hover:border-primary/20 transition-colors">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-slate-900 line-clamp-1 text-base tracking-tight mb-1">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                            <Clock className="w-3 h-3" />{" "}
                            {format(new Date(post.createdAt), "MMM d, yyyy")}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-200" />
                          <span className="text-xs text-slate-400 font-bold">
                            {post.readTime} read
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1.5 rounded-lg bg-secondary/50 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-100 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-600">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-slate-300" />
                      {post.author.name}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        post.status === "Published"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openViewModal(post)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all hover:scale-110"
                        title="View Post"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openEditModal(post)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all hover:scale-110"
                        title="Edit Post"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-110"
                        title="Delete Post"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && !fetchLoading && (
                <tr>
                  <td className="p-20 text-center" colSpan={5}>
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <Search className="w-16 h-16 mb-4 opacity-10" />
                      <p className="text-xl font-black tracking-tight text-slate-400">
                        No Articles Found
                      </p>
                      <p className="text-sm font-medium mt-1">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPost ? "Edit Medical Article" : "Compose New Article"}
        maxWidth="max-w-6xl"
      >
        <form onSubmit={handleSavePost} className="space-y-8 p-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="group">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Article Title
                </label>
                <input
                  name="title"
                  defaultValue={editingPost?.title}
                  type="text"
                  placeholder="Enter a compelling title..."
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-black tracking-tight focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Post Excerpt
                </label>
                <textarea
                  name="excerpt"
                  defaultValue={editingPost?.excerpt}
                  rows={3}
                  placeholder="Summarize the article in 2-3 sentences..."
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Main Content
                </label>
                <RichTextEditor value={blogContent} onChange={setBlogContent} />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Hero Coverage
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/[0.02] transition-all relative overflow-hidden group h-48 flex flex-col items-center justify-center bg-slate-50/50 shadow-inner">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {uploadLoading ? (
                    <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
                  ) : heroImage ? (
                    <img
                      src={heroImage}
                      alt="Hero"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-slate-500 font-black uppercase tracking-wider">
                        Upload HD Image
                      </span>
                    </div>
                  )}
                </div>
                {heroImage && (
                  <button
                    type="button"
                    onClick={() => setHeroImage(null)}
                    className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 mt-2 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Remove Cover
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editingPost?.category}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold appearance-none cursor-pointer focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    required
                  >
                    <option value="Oral Health">Oral Health</option>
                    <option value="Orthodontics">Orthodontics</option>
                    <option value="Cosmetic Density">Cosmetic Density</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Patient Stories">Patient Stories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                    Article Author
                  </label>
                  <input
                    name="author"
                    defaultValue={
                      editingPost?.author?.name || "Dr. Sarah Admin"
                    }
                    type="text"
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                    Search Tags
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="tags"
                      defaultValue={editingPost?.tags?.join(", ")}
                      type="text"
                      placeholder="Tips, Hygiene, Care..."
                      className="w-full pl-11 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                    Visibility
                  </label>
                  <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                    <select
                      name="status"
                      defaultValue={editingPost?.status || "Draft"}
                      className="w-full px-4 py-2 bg-transparent text-sm font-black uppercase tracking-widest cursor-pointer outline-none"
                      required
                    >
                      <option value="Draft">Draft Mode</option>
                      <option value="Published">Public View</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-end gap-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary text-white px-10 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 hover:-translate-y-0.5"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              {editingPost ? "Update Article" : "Publish Article"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* View Modal */}
      <AdminModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Article Preview"
        maxWidth="max-w-4xl"
      >
        {selectedPost && (
          <div className="space-y-8 p-4">
            <div className="relative h-80 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="px-4 py-1.5 bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md">
                  {selectedPost.category}
                </span>
                <h2 className="text-4xl font-black text-white mt-4 tracking-tighter leading-tight">
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-between py-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary/20">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-black text-slate-900 leading-tight">
                    {selectedPost.author.name}
                  </p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                    {selectedPost.author.role}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                  Publish Date
                </span>
                <p className="text-sm font-black text-slate-800">
                  {format(new Date(selectedPost.createdAt), "MMMM d, yyyy")}
                </p>
              </div>
            </div>

            <div
              className="prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed prose-headings:font-black prose-headings:tracking-tight prose-p:text-lg prose-p:leading-8 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />

            <div className="flex flex-wrap gap-2 pt-10 border-t border-slate-100">
              {selectedPost.tags?.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
