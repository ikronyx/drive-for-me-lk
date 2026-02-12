export default function BookingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Pickup</th>
              <th className="p-4">Drop</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">Nimal Perera</td>
              <td className="p-4">Colombo 07</td>
              <td className="p-4">Mount Lavinia</td>
              <td className="p-4 text-green-600">Completed</td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Kasun Silva</td>
              <td className="p-4">Battaramulla</td>
              <td className="p-4">Negombo</td>
              <td className="p-4 text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
