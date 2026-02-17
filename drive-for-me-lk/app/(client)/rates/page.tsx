import Link from "next/link";

export default function RatesPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[20vh] items-center justify-center bg-white text-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[var(--primary)]/5 blur-3xl"></div>
          <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[var(--primary)]/5 blur-3xl"></div>
        </div>

        <div className="px-6">
          <h1 className="text-4xl font-bold text-black animate-fadeInUp">
            Simple & Transparent Rates
          </h1>
          <p className="mt-3 text-gray-600 animate-fadeInUp animate-delay-100">
            No hidden charges. Clear pricing you can understand in seconds.
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="relative bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-8">
          {/* Base Fare */}
          <div className="rounded-2xl bg-white p-8 shadow-lg text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2 text-black">Base Fare</h3>
            <p className="text-4xl font-bold text-[var(--primary)] mb-3">
              Rs.2000
            </p>
            <p className="text-gray-600 text-sm">
              Covers the first <strong>10km</strong> of your trip.
            </p>
          </div>

          {/* Additional Distance */}
          <div className="rounded-2xl bg-white p-8 shadow-lg text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2 text-black">
              Extra Distance
            </h3>
            <p className="text-4xl font-bold text-[var(--primary)] mb-3">
              Rs.100/km
            </p>
            <p className="text-gray-600 text-sm">
              Charged after the first 10km.
            </p>
          </div>

          {/* Waiting */}
          <div className="rounded-2xl bg-white p-8 shadow-lg text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2 text-black">
              Waiting Time
            </h3>
            <p className="text-4xl font-bold text-[var(--primary)] mb-3">
              Rs.300
            </p>
            <p className="text-gray-600 text-sm">
              Every additional <strong>15 minutes</strong> after the first free
              15 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* HOW WAITING WORKS */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-center text-black mb-10">
            Waiting Charges Explained
          </h2>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--primary)] text-white">
                <tr>
                  <th className="px-6 py-4">Customer Arrival Time</th>
                  <th className="px-6 py-4">Waiting Charge</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b">
                  <td className="px-6 py-4">Before 10:15 PM</td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    FREE
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4">10:15:01 – 10:30:00</td>
                  <td className="px-6 py-4">Rs. 300</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4">10:30:01 – 10:45:00</td>
                  <td className="px-6 py-4">Rs. 600</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">10:45:01 – 11:00:00</td>
                  <td className="px-6 py-4">Rs. 900</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* EXAMPLE BILL */}
      <section className="relative bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6 text-center">
              Example Fare Calculation
            </h2>

            <div className="space-y-3 text-gray-700 text-sm">
              <p className="font-bold">Scenario</p>
              <p>
                Trip distance: <strong>15 km</strong>
              </p>
              <p>
                Driver booked at: <strong>10:00 PM</strong>
              </p>
              <p>
                Customer arrived at: <strong>10:32 PM</strong>
              </p>

              <hr className="my-4" />
              <p className="font-bold">Fare Calculation:</p>
              <p>
                First 10km: <strong>Rs. 2000</strong>
              </p>
              <p>
                Additional 5km: <strong>Rs. 500</strong>
              </p>
              <p>
                Waiting (2 × 15min): <strong>Rs. 600</strong>
              </p>

              <hr className="my-4" />

              <p className="text-lg font-bold text-[var(--primary)]">
                Total Fare: Rs. 3100
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-black">
          Ready to book your driver?
        </h2>
        <p className="mt-3 text-gray-600">
          Safe, reliable and transparent pricing every time.
        </p>

        <Link
          href="/bookings"
          className="mt-8 inline-block rounded-xl bg-[var(--primary)] px-10 py-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
        >
          Get a Driver Now
        </Link>
      </section>
    </main>
  );
}
