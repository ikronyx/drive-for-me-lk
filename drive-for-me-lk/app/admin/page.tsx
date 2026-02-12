import { Car, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Car className="text-[var(--primary)] mb-3" />
          <p className="text-sm text-gray-500">Total Bookings</p>
          <h2 className="text-2xl font-bold">128</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <Users className="text-[var(--primary)] mb-3" />
          <p className="text-sm text-gray-500">Active Drivers</p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <DollarSign className="text-[var(--primary)] mb-3" />
          <p className="text-sm text-gray-500">Revenue (This Month)</p>
          <h2 className="text-2xl font-bold">LKR 245,000</h2>
        </div>
      </div>
    </div>
  );
}
