"use client";

import { Search, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";

const pages = [
  { label: "Dashboard", href: "/admin-access", category: "General" },
  { label: "Bookings", href: "/admin-access/booking", category: "Management" },
  { label: "Contacts", href: "/admin-access/contact", category: "Inquiries" },
  { label: "Blogs", href: "/admin-access/blog", category: "Content" },
  { label: "Services", href: "/admin-access/services", category: "Management" },
  { label: "Testimonials", href: "/admin-access/testimonials", category: "Content" },
  { label: "Doctors", href: "/admin-access/doctors", category: "Management" },
  { label: "Activity Logs", href: "/admin-access/activity-logs", category: "Audit" },
  { label: "Settings", href: "/admin-access/settings", category: "General" },
];

export default function AdminHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredPages = searchTerm.trim() === "" 
    ? [] 
    : pages.filter(page => 
        page.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (href: string) => {
    router.push(href);
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100">
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden sm:flex relative flex-1 max-w-md" ref={searchRef}>
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search pages (e.g. 'bookings', 'logs')..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          
          {showResults && searchTerm.trim() !== "" && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2">
                {filteredPages.length > 0 ? (
                  <div className="space-y-1">
                    {filteredPages.map((page) => (
                      <button
                        key={page.href}
                        onClick={() => handleNavigate(page.href)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                            {page.label}
                          </p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                            {page.category}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <kbd className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">Go</kbd>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-slate-500 font-medium italic">No pages found matching "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications hidden as requested */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 ml-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            A
          </div>
          <div className="hidden sm:block text-sm text-right">
            <p className="font-bold text-slate-900 leading-none">Admin</p>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Management</p>
          </div>
        </div>
      </div>
    </header>
  );
}
