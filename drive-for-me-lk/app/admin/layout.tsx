import type { Metadata } from "next";
import "../../app/globals.css";
import AdminLayoutClient from "../components/AdminLayoutClient";

export const metadata: Metadata = {
  title: "Drive For Me by iKronyx",
  description: "Created by iKronyx",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
