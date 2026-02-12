"use client";

import Link from "next/link";
import { LayoutDashboard, Car, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: Car },
  { name: "Drivers", href: "/admin/drivers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-black text-white hidden md:flex flex-col p-6">
      <h2 className="text-xl font-bold mb-8 text-[var(--primary)]">
        Admin Panel
      </h2>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                active ? "bg-[var(--primary)] text-white" : "hover:bg-white/10"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
