"use client";

import { useEffect, useState } from "react";

type Driver = {
  id: number;
  name: string;
};

type Props = {
  bookingId: number;
  onClose: () => void;
  onAssigned: () => void;
};

export default function AssignDriverModal({
  bookingId,
  onClose,
  onAssigned,
}: Props) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch available drivers
  async function fetchDrivers() {
    try {
      const res = await fetch(`/api/drivers/available?bookingId=${bookingId}`);
      const json = await res.json();
      if (json.ok) setDrivers(json.drivers);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function assignDriver() {
    if (!selectedDriver) return;
    setLoading(true);
    try {
      const res = await fetch("/api/bookings/assign-driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: bookingId,
          driver_id: selectedDriver,
        }),
      });
      const json = await res.json();
      if (json.ok) {
        onAssigned();
        onClose();
      } else {
        alert(json.error || "Failed to assign driver");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Assign Driver</h2>

        {drivers.length === 0 ? (
          <p>No available drivers for this time.</p>
        ) : (
          <select
            className="border rounded w-full p-2 mb-4"
            value={selectedDriver ?? ""}
            onChange={(e) => setSelectedDriver(Number(e.target.value))}
          >
            <option value="" disabled>
              Select a driver
            </option>
            {drivers.map((d) => (
              <option className="text-black" key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button
            onClick={assignDriver}
            disabled={!selectedDriver || loading}
            className="px-4 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] disabled:opacity-50"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
