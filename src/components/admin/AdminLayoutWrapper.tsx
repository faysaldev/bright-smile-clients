"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin-access/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-background font-body">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background font-body flex">
      {/* Sidebar Navigation */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 lg:p-10 overflow-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
