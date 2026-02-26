"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import DriverModal from "@/app/components/DriverModal";
import AvailabilityModal from "@/app/components/AvailabilityModal";

type Driver = {
  id: number;
  full_name: string;
  address: string;
  nic: string;
  driver_license: string;
  phone_primary: string;
  phone_secondary?: string;
  nationality?: string;
  languages?: string;
  status?: string;
  gender?: string;
  created_at?: string;
  updated_at?: string;

  // ✅ NEW FIELDS
  available_from?: string | null;
  available_to?: string | null;
  availability_status?: string;
};

export default function DriversAdminPage() {
  const [data, setData] = useState<Driver[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("id");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<Driver | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/drivers?page=${page}&search=${search}&sort=${sort}`,
      );
      const json = await res.json();
      setData(json.data);
      setTotalPages(json.totalPages);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [page, search, sort]);

  const handleDelete = async (driver: Driver) => {
    if (
      confirm(`Are you sure you want to delete driver ${driver.full_name}?`)
    ) {
      await fetch(`/api/drivers/${driver.id}`, { method: "DELETE" });
      fetchData();
    }
  };

  function isAvailableNow(driver: Driver) {
    if (!driver.available_from || !driver.available_to) return false;

    const now = new Date();
    const from = new Date(driver.available_from);
    const to = new Date(driver.available_to);

    return (
      now >= from && now <= to && driver.availability_status === "available"
    );
  }

  return (
    <div className="p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Drivers</h1>

        <button
          onClick={() => {
            setSelected(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-xl"
        >
          <Plus size={16} />
          Add Driver
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center border rounded-lg px-3 py-2 w-full max-w-sm">
          <Search size={16} />
          <input
            className="ml-2 outline-none w-full"
            placeholder="Search name, phone, or NIC"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        <select
          className="border rounded-lg px-3 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="id">Newest</option>
          <option value="full_name">Name</option>
          <option value="status">Status</option>
          <option value="created_at">Created</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Primary Phone</th>
              <th className="p-3">NIC</th>
              <th className="p-3">License</th>
              <th className="p-3">Status</th>
              <th className="p-3">Availability</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr
                key={d.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td
                  className="p-3"
                  onClick={() => {
                    setSelected(d);
                    setShowModal(true);
                  }}
                >
                  {d.full_name}
                </td>
                <td>{d.phone_primary}</td>
                <td>{d.nic}</td>
                <td>{d.driver_license}</td>
                <td>{d.status || "-"}</td>
                <td className="p-3">
                  {isAvailableNow(d) ? (
                    <span className="flex items-center gap-2 text-green-600 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                      Available
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                      Unavailable
                    </span>
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  {/* EDIT */}
                  <button
                    onClick={() => {
                      setSelected(d);
                      setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  {/* AVAILABILITY */}
                  <button
                    onClick={() => {
                      setSelected(d);
                      setShowAvailabilityModal(true);
                    }}
                    className="bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600"
                  >
                    Availability
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(d)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between p-4">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <DriverModal
          driver={selected}
          onClose={() => {
            setShowModal(false);
            fetchData();
          }}
        />
      )}
      {showAvailabilityModal && selected && (
        <AvailabilityModal
          driver={selected}
          onClose={() => {
            setShowAvailabilityModal(false);
            setSelected(null);
          }}
          onSaved={() => fetchData()}
        />
      )}
    </div>
  );
}
