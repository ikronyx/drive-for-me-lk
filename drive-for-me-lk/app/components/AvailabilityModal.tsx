"use client";

import { useEffect, useState } from "react";

export default function AvailabilityModal({ driver, onClose }: any) {
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [status, setStatus] = useState("available");
  const [availabilityId, setAvailabilityId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Load existing availability
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/drivers/available?driver_id=${driver.id}`);
      const json = await res.json();

      if (json.ok && json.data) {
        const a = json.data;
        setAvailabilityId(a.id);
        setAvailableFrom(a.available_from?.slice(0, 16));
        setAvailableTo(a.available_to?.slice(0, 16));
        setStatus(a.status || "available");
      }
    }

    load();
  }, [driver.id]);

  const handleSave = async () => {
    setLoading(true);

    const payload = {
      driver_id: driver.id,
      available_from: availableFrom,
      available_to: availableTo,
      status,
    };

    let res;

    if (availabilityId) {
      res = await fetch("/api/drivers/available", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: availabilityId,
          ...payload,
        }),
      });
    } else {
      res = await fetch("/api/drivers/available/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    const json = await res.json();

    if (!json.ok) {
      alert(json.error);
    } else {
      onClose();
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
        <h2 className="text-lg font-bold">Availability – {driver.full_name}</h2>

        <input
          type="datetime-local"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="datetime-local"
          value={availableTo}
          onChange={(e) => setAvailableTo(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-[var(--primary)] text-white px-4 py-2 rounded"
          >
            {availabilityId ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
