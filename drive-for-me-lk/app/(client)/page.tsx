"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Car, DollarSign, ShieldCheck, MapPin, Flag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  function handleGetDriver(e: React.MouseEvent) {
    e.preventDefault();
    router.push("/bookings");
  }
  return (
    <>
      {/* <Header /> */}

      <main className="w-full overflow-x-hidden">
        {/* HERO / BANNER SECTION */}
        <section
          className="relative flex min-h-[90vh] items-center justify-center px-4"
          style={{
            backgroundImage: `url('/hero-banner.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

          {/* Fare Estimator Card */}
          <div
            className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl md:p-10
  transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,50,255,0.2)]"
          >
            {/* Floating Gradient Accent Circle */}
            <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-gradient-to-br from-[var(--primary)]/30 to-[#0032ff]/10 blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-tr from-[#0032ff]/20 to-[var(--primary)]/20 blur-3xl animate-pulse-slow" />

            <h1 className="mb-2 text-center text-3xl font-bold text-black drop-shadow-md">
              Estimate Your Fare
            </h1>
            <p className="mb-6 text-center text-sm text-gray-500">
              Party on, ride safe
            </p>

            <form className="space-y-6">
              {/* Pick Up */}
              <div className="relative">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Pick Up
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-[var(--primary)]"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Where are you?"
                    className="group w-full rounded-xl border border-gray-300 px-12 py-3 text-sm text-gray-700
          focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30
          transition shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              {/* Drop Off */}
              <div className="relative">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Drop Off
                </label>
                <div className="relative">
                  <Flag
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-[var(--primary)]"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="group w-full rounded-xl border border-gray-300 px-12 py-3 text-sm text-gray-700
          focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30
          transition shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-[var(--primary)] to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all
      hover:from-blue-600 hover:to-[var(--primary)] hover:shadow-xl active:scale-95 cursor-pointer"
              >
                Get an Estimate
              </button>
              <button
                type="button"
                onClick={handleGetDriver}
                className="w-full rounded-xl bg-[var(--primary-dark)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 cursor-pointer"
              >
                Get a Driver
              </button>
            </form>
          </div>
        </section>

        {/* SAFETY & TRUST SECTION */}
        {/* TRUST & SAFETY SECTION */}
        <section
          id="about"
          className="relative mx-auto max-w-7xl px-6 py-20 text-center"
        >
          {/* Subtle background circles */}
          <div className="absolute left-1/4 top-0 -z-10 h-64 w-64 rounded-full bg-[var(--primary)]/10 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-0 -z-10 h-64 w-64 rounded-full bg-[var(--primary)]/10 blur-3xl"></div>

          <h2 className="mb-6 text-3xl font-bold text-black animate-fadeInUp">
            Safe rides home, the Sri Lankan way
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600 animate-fadeInUp animate-delay-100">
            Whether it’s a party, wedding, or night out with friends, our
            professional designated drivers ensure you and your vehicle get home
            safely. We understand Sri Lankan roads, local conditions, and the
            importance of getting home without risk.
          </p>
        </section>

        {/* FEATURES SECTION */}
        <section className="relative bg-gray-50 py-20">
          {/* Decorative gradient lines */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-1/3 h-[600px] w-[600px] rounded-full bg-[var(--primary)]/5 blur-3xl"></div>
            <div className="absolute right-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[var(--primary)]/5 blur-3xl"></div>
          </div>

          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl text-center">
              <Car className="mx-auto mb-4 h-14 w-14 text-[var(--primary-fade)] transition-transform duration-500 hover:scale-110" />
              <h3 className="mb-2 text-lg font-semibold text-black">
                Your car, our driver
              </h3>
              <p className="text-sm text-gray-600">
                No taxis, no hassle. We drive you home in the comfort of your
                own vehicle.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl text-center">
              <DollarSign className="mx-auto mb-4 h-14 w-14 text-[var(--primary-fade)] transition-transform duration-500 hover:scale-110" />
              <h3 className="mb-2 text-lg font-semibold text-black">
                Transparent pricing
              </h3>
              <p className="text-sm text-gray-600">
                Clear distance-based rates with fair waiting charges — no
                surprises.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl text-center">
              <ShieldCheck className="mx-auto mb-4 h-14 w-14 text-[var(--primary-fade)] transition-transform duration-500 hover:scale-110" />
              <h3 className="mb-2 text-lg font-semibold text-black">
                Trusted & professional
              </h3>
              <p className="text-sm text-gray-600">
                Experienced drivers trained to handle night drives safely and
                responsibly.
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION SECTION */}
        <section className="relative py-20 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-tr from-[var(--primary)]/10 to-[var(--primary)]/5 blur-3xl"></div>

          <h2 className="text-3xl font-bold text-black animate-fadeInUp">
            Enjoy the night. We’ll handle the ride.
          </h2>
          <p className="mt-3 text-gray-600 animate-fadeInUp animate-delay-100">
            Book a designated driver and get home safely.
          </p>
          <Link
            href="/bookings"
            className="mt-8 inline-block rounded-xl bg-[var(--primary)] px-10 py-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl hover:bg-blue-700"
          >
            Get a Driver
          </Link>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
}
