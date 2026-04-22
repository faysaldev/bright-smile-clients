"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Search,
  MessageSquare,
  Reply,
  Trash2,
  Loader2,
  User,
} from "lucide-react";
import {
  useViewInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useReplyToInquiryMutation,
} from "@/src/redux/features/contact/contactApi";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminContacts() {
  const { data: inquiries, isLoading } = useViewInquiriesQuery({});
  const [updateStatus] = useUpdateInquiryStatusMutation();
  const [replyToInquiry, { isLoading: isReplying }] =
    useReplyToInquiryMutation();

  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Set first message as active when data loads
  useEffect(() => {
    if (inquiries?.length > 0 && !activeMessageId) {
      setActiveMessageId(inquiries[0]._id);
    }
  }, [inquiries, activeMessageId]);

  const activeMessage = inquiries?.find((m: any) => m._id === activeMessageId);

  const handleSelectMessage = async (msg: any) => {
    setActiveMessageId(msg._id);

    // Mark as read if it's currently unread
    if (msg.status === "unread") {
      try {
        await updateStatus({ id: msg._id, status: "read" }).unwrap();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to mark as read.");
      }
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return toast.error("Please type a reply.");

    try {
      await replyToInquiry({
        id: activeMessage?._id,
        reply: replyText,
      }).unwrap();

      toast.success(`Reply sent to ${activeMessage?.name}`);
      setReplyText("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send reply.");
    }
  };

  const filteredInquiries = inquiries?.filter(
    (m: any) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary/30" />
      </div>
    );
  }

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] min-h-[600px] flex flex-col animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Contact Messages</h1>
        <p className="text-slate-500 text-sm mt-1">
          Review and respond to patient inquiries.
        </p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 flex overflow-hidden">
        {/* Messages List */}
        <div className="w-1/3 border-r border-slate-100 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredInquiries?.length === 0 && (
              <p className="text-slate-400 p-8 text-center text-sm italic">
                No messages found.
              </p>
            )}
            {filteredInquiries?.map((msg: any) => (
              <div
                key={msg._id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-colors ${
                  activeMessageId === msg._id
                    ? "bg-primary/5 border-l-2 border-l-primary"
                    : "hover:bg-slate-50 border-l-2 border-l-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={`text-sm font-bold ${msg.status === "unread" ? "text-slate-900" : "text-slate-600"}`}
                  >
                    {msg.name}
                  </h3>
                  <span className="text-[10px] font-medium text-slate-400">
                    {format(new Date(msg.createdAt), "MMM d, h:mm a")}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  {msg.status === "replied" && (
                    <Reply className="w-3 h-3 text-emerald-500" />
                  )}
                  <h4
                    className={`text-xs truncate ${msg.status === "unread" ? "font-black text-slate-800" : "text-slate-500"}`}
                  >
                    {msg.subject}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 truncate font-medium">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Viewer */}
        <div className="flex-1 flex flex-col bg-slate-50/50">
          {activeMessage ? (
            <>
              <div className="p-6 border-b border-slate-100  flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl shadow-inner uppercase">
                    {activeMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      {activeMessage.subject}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs font-bold text-slate-600">
                        {activeMessage.name}
                      </p>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <p className="text-xs text-slate-400 font-medium tracking-tight">
                        {activeMessage.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      activeMessage.status === "unread"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : activeMessage.status === "replied"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    {activeMessage.status}
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 overflow-y-auto">
                <div className=" p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed font-medium">
                    {activeMessage.message}
                  </p>
                </div>

                {activeMessage.status === "replied" && (
                  <div className="mt-8 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Reply className="w-12 h-12 text-emerald-500" />
                    </div>
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3">
                      Status: Successfully Replied
                    </p>
                    <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                      This inquiry has been marked as resolved. A reply was
                      shared with the patient and the conversation is now
                      tracked in the system records.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white border-t border-slate-100">
                <div className="flex gap-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-28 placeholder:text-slate-400"
                    placeholder={`Reply to ${activeMessage.name}...`}
                  ></textarea>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleReply}
                    className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    <Reply className="w-4 h-4" /> Send Reply
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 opacity-20" />
              </div>
              <p className="font-bold text-lg">No message selected</p>
              <p className="text-sm mt-1">
                Choose an inquiry from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
