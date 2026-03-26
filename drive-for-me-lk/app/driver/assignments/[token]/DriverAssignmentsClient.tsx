"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DriverAssignmentsClient({ token }: { token: string }) {
  const [data, setData] = useState<any>(null);
  const [tab, setTab] = useState<"jobs" | "account">("jobs");
  const router = useRouter();

  async function fetchData() {
    const res = await fetch(`/api/driver/assignments/${token}`);
    const json = await res.json();
    setData(json);
  }

  async function toggleAvailability() {
    const newStatus =
      data.driver.availability === "available" ? "unavailable" : "available";

    await fetch("/api/drivers/toggle-availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, status: newStatus }),
    });

    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  if (!data) return <div className="p-6">Loading...</div>;
  if (!data.ok) return <div className="p-6">Invalid Link</div>;

  const currentBooking = data.driver.current_booking;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3 shadow">
        <h1 className="font-bold text-lg">{data.driver.name}</h1>

        <button
          onClick={toggleAvailability}
          className={`w-14 h-7 rounded-full relative transition ${
            data.driver.availability === "available"
              ? "bg-[#0032ff]"
              : "bg-gray-400"
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition ${
              data.driver.availability === "available" ? "translate-x-7" : ""
            }`}
          />
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="p-4">
        {tab === "jobs" && (
          <div className="space-y-4">
            {data.assignments
              .filter((a: any) => a.status !== "completed")
              .map((a: any) => (
                <div
                  key={a.id}
                  className="bg-white rounded-xl shadow p-4 border"
                >
                  <div className="font-semibold text-black">
                    {a.booking.customer_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {a.booking.pickup_location} →{" "}
                    {a.booking.dropoff_location || "-"}
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    {a.booking.arrival_time
                      ? new Date(a.booking.arrival_time).toLocaleString()
                      : "-"}
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/driver/trip/${a.booking.id}?token=${token}`)
                    }
                    className="mt-3 w-full py-2 rounded bg-[#0032ff] text-white"
                  >
                    View
                  </button>
                </div>
              ))}
          </div>
        )}

        {tab === "account" && (
          <div className="text-center text-gray-600 mt-10">
            Driver Account Info Here
          </div>
        )}
      </div>

      {/* FLOATING BUTTON */}
      {currentBooking !== -1 && (
        <button
          onClick={() =>
            router.push(`/driver/trip/${currentBooking}?token=${token}`)
          }
          className="fixed bottom-24 right-5 bg-[#0032ff] text-white px-5 py-3 rounded-full shadow-lg"
        >
          Resume Trip
        </button>
      )}

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center">
        <button onClick={() => setTab("jobs")}>📋</button>
        <button onClick={() => setTab("account")}>👤</button>
      </div>
    </div>
  );
}
