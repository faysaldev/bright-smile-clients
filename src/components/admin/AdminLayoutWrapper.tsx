"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector(selectCurrentUser);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin-access/login";

  useEffect(() => {
    if (!user && !isLoginPage) {
      router.replace("/admin-access/login");
    } else if (user && isLoginPage) {
      router.replace("/admin-access");
    }
  }, [user, isLoginPage, router]);

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-background font-body">{children}</div>
    );
  }

  if (!user) {
    return null; // Or a loading spinner
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
