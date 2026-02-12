"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col">
        {/* Mobile Topbar */}
        <div className="flex items-center justify-between bg-black px-6 py-4 text-white md:hidden">
          <h1 className="font-bold text-[var(--primary)]">Admin Panel</h1>
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
