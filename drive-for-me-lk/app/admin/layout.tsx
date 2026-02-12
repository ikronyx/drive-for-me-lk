"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import AdminSidebar from "../components/AdminSidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drive For Me by iKronyx",
  description: "Created by iKronyx",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
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
