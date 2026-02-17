import { useState } from "react";

export default function BookingModal({
  booking,
  onClose,
}: {
  booking: any;
  onClose: () => void;
}) {
  const [form, setForm] = useState(
    booking || {
      customer_name: "",
      phone: "",
      pickup_location: "",
      dropoff_location: "",
      arrival_time: "",
      landmark: "",
      vehicle_reg_no: "",
      notes: "",
      distance_km: "",
      estimated_fare: "",
      payment_status: "unpaid",
      status: "pending",
    },
  );

  const isEdit = !!booking;

  async function save() {
    const url = isEdit ? `/api/bookings/${booking.id}` : `/api/bookings`;
    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    onClose();
  }

  // Fields to exclude from editing
  const excludedKeys = ["id"];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold">
          {isEdit ? "Edit Booking" : "Add Booking"}
        </h2>

        {/* Fields */}
        {Object.keys(form)
          .filter((key) => !excludedKeys.includes(key))
          .map((key) => {
            const value = (form as any)[key];

            // Special inputs for certain fields
            if (key === "arrival_time") {
              return (
                <div key={key}>
                  <label className="text-sm font-medium capitalize">
                    {key.replace("_", " ")}
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={
                      value ? new Date(value).toISOString().slice(0, 16) : ""
                    }
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                  />
                </div>
              );
            }

            if (key === "status") {
              return (
                <div key={key}>
                  <label className="text-sm font-medium capitalize">
                    {key.replace("_", " ")}
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={value || "pending"}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              );
            }

            if (key === "payment_status") {
              return (
                <div key={key}>
                  <label className="text-sm font-medium capitalize">
                    {key.replace("_", " ")}
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={value || "unpaid"}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              );
            }

            // Default text input
            return (
              <div key={key}>
                <label className="text-sm font-medium capitalize">
                  {key.replace("_", " ")}
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={value || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            );
          })}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={save}
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
