"use client";

import { useState } from "react";
import { MapPin, Phone, User, Car } from "lucide-react";

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [alertBox, setAlertBox] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup_location: "",
    arrival_time: "",
    vehicle_reg_no: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.ok) {
        setAlertBox({
          type: "success",
          message: "Booking created successfully!",
        });
      } else {
        setAlertBox({
          type: "error",
          message: "Error creating booking. Please try again.",
        });
      }
    } catch (err) {
      setAlertBox({
        type: "error",
        message: "Server error. Please retry.",
      });
    }

    setLoading(false);
  }

  function BookingLoader({ visible }: { visible: boolean }) {
    if (!visible) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex flex-col items-center gap-4 animate-[fadeIn_0.3s_ease]">
          {/* Spinner */}
          <div className="h-12 w-12 border-4 border-gray-200 border-t-[var(--primary)] rounded-full animate-spin" />

          {/* Text */}
          <div className="text-center">
            <h2 className="font-semibold text-lg">Processing Booking</h2>
            <p className="text-sm text-gray-500">
              Please wait while we confirm your driver...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url('/hero-banner.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-1 w-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--primary)] to-blue-600 animate-[loadingBar_1.2s_linear_infinite]" />
          </div>
        </div>
      )}
      <BookingLoader visible={loading} />

      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl md:p-10 relative">
        {/* Glow effects */}
        <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-[var(--primary)]/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />

        <h1 className="text-3xl font-bold text-center mb-2">Book a Driver</h1>
        <p className="text-center text-gray-500 mb-8">
          Get home safe with your own vehicle 🇱🇰
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                required
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-300 px-12 py-3 text-sm focus:ring-2 focus:ring-[var(--primary)]/30"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                required
                type="tel"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="07XXXXXXXX"
                className="w-full rounded-xl border border-gray-300 px-12 py-3 text-sm focus:ring-2 focus:ring-[var(--primary)]/30"
                value={form.phone || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                  if (value.length <= 10) {
                    setForm({ ...form, phone: value });
                  }
                }}
              />
            </div>
          </div>

          {/* Pickup */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                required
                type="text"
                placeholder="e.g. Gangaramaya Temple, Colombo"
                className="w-full rounded-xl border border-gray-300 px-12 py-3 text-sm focus:ring-2 focus:ring-[var(--primary)]/30"
                onChange={(e) =>
                  setForm({ ...form, pickup_location: e.target.value })
                }
              />
            </div>
          </div>

          {/* Arrival Time */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Arrival Time
            </label>
            <input
              required
              type="datetime-local"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--primary)]/30"
              onChange={(e) =>
                setForm({ ...form, arrival_time: e.target.value })
              }
            />
          </div>

          {/* Vehicle */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Vehicle Number (Optional)
            </label>
            <div className="relative">
              <Car
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="WP CAB 1234"
                className="w-full rounded-xl border border-gray-300 px-12 py-3 text-sm"
                onChange={(e) =>
                  setForm({ ...form, vehicle_reg_no: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[var(--primary)] to-blue-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl active:scale-95"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
          {/* Call Option */}
          <div className="pt-2 text-center border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              Prefer speaking with us? අපිට කෝල් කරන්න 😊
            </p>

            <a
              href="tel:0711111111"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold text-base hover:underline"
            >
              <Phone size={18} />
              075 419 1574
            </a>
          </div>
        </form>
      </div>

      {alertBox.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center animate-[fadeIn_0.3s_ease]">
            {/* Icon */}
            <div className="mb-4 flex justify-center">
              {alertBox.type === "success" ? (
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
                  ✓
                </div>
              ) : (
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
                  !
                </div>
              )}
            </div>

            {/* Message */}
            <h2 className="text-lg font-semibold mb-2">
              {alertBox.type === "success" ? "Success" : "Error"}
            </h2>

            <p className="text-gray-500 text-sm mb-6">{alertBox.message}</p>

            {/* Buttons */}
            <div className="flex gap-3">
              {alertBox.type === "error" && (
                <button
                  onClick={() => {
                    setAlertBox({ type: null, message: "" });
                    handleSubmit(new Event("submit") as any);
                  }}
                  className="flex-1 rounded-xl bg-red-500 text-white py-2 font-medium hover:bg-red-600"
                >
                  Retry
                </button>
              )}

              <button
                onClick={() => setAlertBox({ type: null, message: "" })}
                className="flex-1 rounded-xl bg-gray-200 text-gray-700 py-2 font-medium hover:bg-gray-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
