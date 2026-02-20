"use client";

import { useState } from "react";

type Driver = {
  id?: number;
  full_name: string;
  address?: string;
  nic: string;
  driver_license: string;
  phone_primary: string;
  phone_secondary?: string;
  nationality?: string;
  languages?: string;
  status?: string;
  gender?: string;
};

export default function DriverModal({
  driver,
  onClose,
}: {
  driver: Driver | null;
  onClose: () => void;
}) {
  const isEdit = !!driver;

  const [form, setForm] = useState<Driver>(
    driver || {
      full_name: "",
      address: "",
      nic: "",
      driver_license: "",
      phone_primary: "",
      phone_secondary: "",
      nationality: "",
      languages: "",
      status: "active",
      gender: "",
    },
  );

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!form.full_name || !form.nic || !form.phone_primary) {
      alert("Full name, NIC, and primary phone are required.");
      return;
    }

    setLoading(true);
    try {
      const url = isEdit ? `/api/drivers/${driver?.id}` : "/api/drivers";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!json.ok) {
        alert(json.error || "Error saving driver");
      } else {
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold">
          {isEdit ? "Edit Driver" : "Add Driver"}
        </h2>
        {loading && (
          <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-[var(--primary)] animate-loading-bar"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ID (readonly for editing) */}
          {isEdit && (
            <div>
              <label className="text-sm font-medium">ID</label>
              <input
                disabled={loading}
                value={form.id}
                readOnly
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium">Full Name *</label>
            <input
              disabled={loading}
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* NIC */}
          <div>
            <label className="text-sm font-medium">NIC *</label>
            <input
              disabled={loading}
              value={form.nic}
              onChange={(e) => setForm({ ...form, nic: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Driver License */}
          <div>
            <label className="text-sm font-medium">Driver License *</label>
            <input
              disabled={loading}
              value={form.driver_license}
              onChange={(e) =>
                setForm({ ...form, driver_license: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Primary Phone */}
          <div>
            <label className="text-sm font-medium">Phone Primary *</label>
            <input
              disabled={loading}
              value={form.phone_primary}
              onChange={(e) =>
                setForm({ ...form, phone_primary: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Secondary Phone */}
          <div>
            <label className="text-sm font-medium">Phone Secondary</label>
            <input
              disabled={loading}
              value={form.phone_secondary || ""}
              onChange={(e) =>
                setForm({ ...form, phone_secondary: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Address</label>
            <input
              disabled={loading}
              value={form.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Nationality */}
          <div>
            <label className="text-sm font-medium">Nationality</label>
            <input
              disabled={loading}
              value={form.nationality || ""}
              onChange={(e) =>
                setForm({ ...form, nationality: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Languages */}
          <div>
            <label className="text-sm font-medium">Languages</label>
            <input
              disabled={loading}
              value={form.languages || ""}
              onChange={(e) => setForm({ ...form, languages: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              disabled={loading}
              value={form.status || "active"}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              disabled={loading}
              value={form.gender || ""}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
