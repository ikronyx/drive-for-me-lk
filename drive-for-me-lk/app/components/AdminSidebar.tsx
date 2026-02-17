"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Car,
  Users,
  Settings,
  X,
  ChevronDown,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    name: "Bookings",
    href: "/admin/bookings/all",
    icon: Car,
    sub: [
      { name: "Ongoing", href: "/admin/bookings/ongoing" },
      // { name: "Completed", href: "/admin/bookings/completed" },
      { name: "All", href: "/admin/bookings/all" },
    ],
  },
  { name: "Drivers", href: "/admin/drivers", icon: Users },
  // { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function AdminSidebar({ open, setOpen }: Props) {
  const pathname = usePathname();
  const [bookingOpen, setBookingOpen] = useState(false);

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
            const active =
              pathname === item.href ||
              (item.sub && item.sub.some((s) => s.href === pathname));

            // If this nav item has a sublist
            if (item.sub) {
              return (
                <div key={item.name}>
                  {/* Main button */}
                  <button
                    onClick={() => setBookingOpen(!bookingOpen)}
                    className={`flex items-center justify-between w-full gap-3 rounded-lg px-4 py-3 text-sm transition ${
                      active
                        ? "bg-[var(--primary)] text-white"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      {item.name}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${bookingOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>

                  {/* Sublist */}
                  {bookingOpen && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.sub.map((sub) => {
                        const subActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className={`px-3 py-2 rounded-lg text-sm transition ${
                              subActive
                                ? "bg-[var(--primary-dark)] text-white"
                                : "hover:bg-white/10"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Normal item without sublist
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
