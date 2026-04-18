"use client";

import { useState } from "react";
import { Mail, Search, MessageSquare, Reply, Trash2 } from "lucide-react";
import { useViewInquiriesQuery } from "@/src/redux/features/contact/contactApi";

export default function AdminContacts() {
  const initialMessages = [
    {
      id: 1,
      name: "David Anderson",
      email: "david.a@example.com",
      subject: "Insurance Inquiry",
      date: "Today, 10:23 AM",
      status: "Unread",
      content:
        "Hi, I was wondering if you accept Delta Dental insurance for routine cleanings? Thanks.",
    },
    {
      id: 2,
      name: "Lisa Wong",
      email: "lisa.w@example.com",
      subject: "Reschedule Request",
      date: "Yesterday, 04:15 PM",
      status: "Read",
      content:
        "I need to reschedule my appointment from Tuesday to Thursday if possible. Please let me know.",
    },
    {
      id: 3,
      name: "Mark Thomas",
      email: "mark.t@example.com",
      subject: "Cost of Implants",
      date: "Oct 22, 2026",
      status: "Replied",
      content:
        "Could you provide a rough estimate for a single tooth implant? Do you offer payment plans?",
    },
  ];

  const { data: queryies } = useViewInquiriesQuery({});
  console.log(queryies);

  const [messages, setMessages] = useState(initialMessages);
  const [activeMessageId, setActiveMessageId] = useState<number | null>(1);
  const [replyText, setReplyText] = useState("");

  const activeMessage = messages.find((m) => m.id === activeMessageId);

  const handleSelectMessage = (id: number) => {
    setActiveMessageId(id);
    setMessages(
      messages.map((m) =>
        m.id === id && m.status === "Unread" ? { ...m, status: "Read" } : m,
      ),
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this message?")) {
      setMessages(messages.filter((m) => m.id !== id));
      if (activeMessageId === id) setActiveMessageId(null);
    }
  };

  const handleReply = () => {
    if (!replyText.trim()) return alert("Please type a reply.");
    alert(`Reply sent to ${activeMessage?.email}`);
    setMessages(
      messages.map((m) =>
        m.id === activeMessageId ? { ...m, status: "Replied" } : m,
      ),
    );
    setReplyText("");
  };

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
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-slate-400 p-4 text-center text-sm">
                No messages.
              </p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-colors ${
                  activeMessageId === msg.id
                    ? "bg-primary/5 border-l-2 border-l-primary"
                    : "hover:bg-slate-50 border-l-2 border-l-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={`text-sm font-medium ${msg.status === "Unread" ? "text-slate-900" : "text-slate-700"}`}
                  >
                    {msg.name}
                  </h3>
                  <span className="text-xs text-slate-400">{msg.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  {msg.status === "Replied" && (
                    <Reply className="w-3 h-3 text-emerald-500" />
                  )}
                  <h4
                    className={`text-xs truncate ${msg.status === "Unread" ? "font-semibold text-slate-800" : "text-slate-600"}`}
                  >
                    {msg.subject}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 truncate">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Viewer */}
        <div className="flex-1 flex flex-col bg-slate-50/50">
          {activeMessage ? (
            <>
              <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">
                    {activeMessage.subject}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {activeMessage.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {activeMessage.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {activeMessage.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(activeMessage.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-8 flex-1 overflow-y-auto">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                  {activeMessage.content}
                </p>
                {activeMessage.status === "Replied" && (
                  <div className="mt-8 bg-slate-100 p-4 rounded-lg border border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 mb-2">
                      Replied
                    </p>
                    <p className="text-sm text-slate-700">
                      Thank you for your message. We have received it and a copy
                      of your reply has been emailed to you.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-24"
                    placeholder="Type your reply here..."
                  ></textarea>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleReply}
                    className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Reply className="w-4 h-4" /> Send Reply
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
