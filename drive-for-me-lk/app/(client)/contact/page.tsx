"use client";

import { Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* HERO / HEADER */}
      <section className="relative py-20 text-center bg-white">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-tr from-[var(--primary)]/10 to-[var(--primary)]/5 blur-3xl"></div>

        <h1 className="text-4xl font-bold text-black">Contact Us</h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Need help booking a driver or have a question? Our team is here to
          assist you anytime.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="relative bg-gray-50 py-20">
        {/* background glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-1/3 h-[600px] w-[600px] rounded-full bg-[var(--primary)]/5 blur-3xl"></div>
          <div className="absolute right-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[var(--primary)]/5 blur-3xl"></div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-3">
          {/* PHONE */}
          <div className="rounded-2xl bg-white p-8 shadow-lg text-center transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl">
            <Phone className="mx-auto mb-4 h-14 w-14 text-[var(--primary-fade)]" />
            <h3 className="text-lg font-semibold text-black mb-2">Call Us</h3>

            <div className="text-sm text-gray-600 space-y-1">
              <a
                href="tel:0754191574"
                className="block hover:text-[var(--primary)]"
              >
                075 419 1574
              </a>
              <a
                href="tel:0788582992"
                className="block hover:text-[var(--primary)]"
              >
                078 858 2992
              </a>
            </div>
          </div>

          {/* WHATSAPP */}
          <div className="rounded-2xl bg-white p-8 shadow-lg text-center transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl">
            <MessageCircle className="mx-auto mb-4 h-14 w-14 text-[var(--primary-fade)]" />
            <h3 className="text-lg font-semibold text-black mb-2">WhatsApp</h3>

            <a
              href="https://wa.me/94788582992"
              target="_blank"
              className="text-sm text-gray-600 hover:text-[var(--primary)]"
            >
              Chat with us on WhatsApp
            </a>
          </div>

          {/* EMAIL */}
          <div className="rounded-2xl bg-white p-8 shadow-lg text-center transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl">
            <Mail className="mx-auto mb-4 h-14 w-14 text-[var(--primary-fade)]" />
            <h3 className="text-lg font-semibold text-black mb-2">Email</h3>

            <a
              href="mailto:driveformelk@gmail.com"
              className="text-sm text-gray-600 hover:text-[var(--primary)]"
            >
              driveformelk@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 text-center">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-tr from-[var(--primary)]/10 to-[var(--primary)]/5 blur-3xl"></div>

        <h2 className="text-3xl font-bold text-black">
          Ready to book your driver?
        </h2>
        <p className="mt-3 text-gray-600">
          Safe, reliable and professional drivers at your service.
        </p>

        <a
          href="/bookings"
          className="mt-8 inline-block rounded-xl bg-[var(--primary)] px-10 py-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl hover:bg-blue-700"
        >
          Book Now
        </a>
      </section>
    </main>
  );
}
