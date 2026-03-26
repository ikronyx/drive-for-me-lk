"use client";

import { useState } from "react";
import ConfirmModal from "@/app/components/driver/ConfirmModal";
import { useTimer, formatTime } from "@/app/components/driver/Timer";
import { calculateFare } from "@/lib/pricing";
import { useRouter } from "next/navigation";

export default function TripTrackerClient({ bookingId, token }: any) {
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);
  const [action, setAction] = useState("");

  const [arrived, setArrived] = useState(false);
  const [tripStarted, setTripStarted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [tripEnded, setTripEnded] = useState(false);

  const [distance, setDistance] = useState(0);
  const [fare, setFare] = useState<number | null>(null);

  const [initialSec] = useTimer(arrived && !tripStarted);
  const [tripSec] = useTimer(tripStarted && !tripEnded && !waiting);
  const [waitSec] = useTimer(waiting);

  function confirmAction(type: string) {
    setAction(type);
    setShowConfirm(true);
  }

  async function handleConfirm() {
    setShowConfirm(false);

    // Fetch current driver availability first
    const res = await fetch("/api/drivers/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }); // or whatever id you need to update
    const data = await res.json();

    const driverId = data.driver.id;
    const availabilityId = data.driver.availability_id;
    if (action === "arrived") {
      setArrived(true);

      // 1️⃣ Update driver_availability: status = on_hire, current_booking = bookingId
      await fetch(`/api/drivers/set-availability`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driver_id: driverId,
          status: "on_hire", // or "available"
          current_booking: bookingId, // or -1 when trip is completed
        }),
      });

      // 3️⃣ Update booking status = driver_arrived
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        body: JSON.stringify({ status: "driver_arrived" }),
      });
    }

    if (action === "startTrip") {
      setTripStarted(true);

      // Update booking status
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        body: JSON.stringify({ status: "trip_started" }),
      });
    }

    if (action === "endTrip") {
      setTripEnded(true);

      await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        body: JSON.stringify({ status: "trip_ended" }),
      });
    }

    if (action === "paid") {
      // 2️⃣ Update booking status + fare
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        body: JSON.stringify({
          status: "completed",
          payment_status: "paid",
          estimated_fare: fare,
          distance_km: distance,
        }),
      });

      // 3️⃣ Update driver_availability: status = available, current_booking = -1
      await fetch(`/api/drivers/set-availability`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driver_id: driverId,
          status: "available",
          current_booking: -1,
        }),
      });

      router.push(`/driver/assignments/${token}`);
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* TIMERS */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-white shadow rounded p-3">
          Initial Waiting: {formatTime(initialSec)}
        </div>
        <div className="bg-white shadow rounded p-3">
          Trip Time: {formatTime(tripSec)}
        </div>
        <div className="bg-white shadow rounded p-3">
          Waiting (Trip): {formatTime(waitSec)}
        </div>
      </div>

      {/* BUTTON FLOW */}
      {!arrived && (
        <button
          onClick={() => confirmAction("arrived")}
          className="w-full py-3 bg-[#0032ff] text-white rounded"
        >
          I have arrived
        </button>
      )}

      {arrived && !tripStarted && (
        <button
          onClick={() => confirmAction("startTrip")}
          className="w-full py-3 bg-green-600 text-white rounded"
        >
          Start Trip
        </button>
      )}

      {tripStarted && !tripEnded && (
        <div className="flex gap-3">
          {!waiting ? (
            <button
              onClick={() => setWaiting(true)}
              className="flex-1 py-3 bg-yellow-500 text-white rounded"
            >
              Start Waiting
            </button>
          ) : (
            <button
              onClick={() => setWaiting(false)}
              className="flex-1 py-3 bg-orange-600 text-white rounded"
            >
              End Waiting
            </button>
          )}

          <button
            onClick={() => confirmAction("endTrip")}
            className="flex-1 py-3 bg-red-600 text-white rounded"
          >
            End Trip
          </button>
        </div>
      )}

      {/* DISTANCE + FARE */}
      {tripEnded && fare === null && (
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Distance (km)"
            className="w-full border p-3 rounded"
            onChange={(e) => setDistance(Number(e.target.value))}
          />
          <button
            onClick={() =>
              setFare(calculateFare(distance, initialSec, waitSec))
            }
            className="w-full py-3 bg-[#0032ff] text-white rounded"
          >
            Calculate Fare
          </button>
        </div>
      )}

      {fare !== null && (
        <div className="bg-white shadow p-4 rounded text-center">
          <div className="text-xl font-bold mb-2">Total: Rs. {fare}</div>
          <button
            onClick={() => confirmAction("paid")}
            className="w-full py-3 bg-green-600 text-white rounded"
          >
            Paid
          </button>
        </div>
      )}

      <ConfirmModal
        open={showConfirm}
        title="Confirm Action"
        message="Are you sure?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
