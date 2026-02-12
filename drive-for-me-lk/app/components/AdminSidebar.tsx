"use client";

import Link from "next/link";
import { LayoutDashboard, Car, Users, Settings, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: Car },
  { name: "Drivers", href: "/admin/drivers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function AdminSidebar({ open, setOpen }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay (Mobile Only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed top-0 left-0 z-50 h-screen w-64 bg-black text-white p-6
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[var(--primary)]">
            Admin Panel
          </h2>

          {/* Close button (Mobile) */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  active
                    ? "bg-[var(--primary)] text-white"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
