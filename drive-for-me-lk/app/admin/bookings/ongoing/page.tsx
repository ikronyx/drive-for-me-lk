"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import BookingModal from "@/app/components/BookingModal";

type Booking = {
  id: number;
  customer_name: string;
  phone: string;
  pickup_location: string;
  dropoff_location?: string;
  arrival_time?: string;
  landmark?: string;
  vehicle_reg_no?: string;
  notes?: string;
  distance_km?: string;
  estimated_fare?: string;
  payment_status?: string;
  status?: string;
};

export default function BookingsAdminPage() {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<keyof Booking>("id");
  const [pageSize] = useState(10);

  const [selected, setSelected] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all bookings once
  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const json = await res.json();
      if (json.ok) setAllBookings(json.bookings);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Filter and sort
  const filtered = allBookings.filter(
    (b) =>
      b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search),
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sort];
    const bVal = b[sort];
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal);
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return bVal - aVal;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bookings</h1>

        <button
          onClick={() => {
            setSelected(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-xl"
        >
          <Plus size={16} />
          Add Booking
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center border rounded-lg px-3 py-2 w-full max-w-sm">
          <Search size={16} />
          <input
            className="ml-2 outline-none w-full"
            placeholder="Search name or phone"
            value={search}
            onChange={(e) => {
              setPage(1); // reset page when search changes
              setSearch(e.target.value);
            }}
          />
        </div>

        <select
          className="border rounded-lg px-3 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value as keyof Booking)}
        >
          <option value="id">Newest</option>
          <option value="customer_name">Name</option>
          <option value="arrival_time">Arrival Time</option>
          <option value="status">Status</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Pickup</th>
              <th className="p-3">Arrival</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((b) => (
              <tr
                key={b.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelected(b);
                  setShowModal(true);
                }}
              >
                <td className="p-3">{b.customer_name}</td>
                <td className="p-3">{b.phone}</td>
                <td className="p-3">{b.pickup_location}</td>
                <td className="p-3">
                  {b.arrival_time
                    ? new Date(b.arrival_time).toLocaleString()
                    : "-"}
                </td>
                <td className="p-3">{b.status || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between p-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <BookingModal
          booking={selected}
          onClose={() => {
            setShowModal(false);
            fetchData(); // refresh data
          }}
        />
      )}
    </div>
  );
}
