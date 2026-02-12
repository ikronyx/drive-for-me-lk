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
    <div className="bg-gray-100">
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Content wrapper */}
      <div className="md:ml-64 flex min-h-screen flex-col">
        {/* Mobile Topbar */}
        <div className="flex items-center justify-between bg-black px-6 py-4 text-white md:hidden">
          <h1 className="font-bold text-[var(--primary)]">Admin Panel</h1>
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
