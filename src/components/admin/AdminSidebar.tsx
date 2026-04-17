"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  Star, 
  Settings,
  LogOut
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin-access", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin-access/booking", icon: CalendarCheck },
  { label: "Contacts", href: "/admin-access/contact", icon: MessageSquare },
  { label: "Blogs", href: "/admin-access/blog", icon: FileText },
  { label: "Services", href: "/admin-access/services", icon: Briefcase },
  { label: "Testimonials", href: "/admin-access/testimonials", icon: Star },
  { label: "Settings", href: "/admin-access/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Link href="/admin-access" className="flex items-center gap-2">
          <img src="/logo-bg.png" alt="BrightSmile Admin" className="h-8 w-auto aspect-auto" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin-access");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-200">
        <Link
          href="/admin-access/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
