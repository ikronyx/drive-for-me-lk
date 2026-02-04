import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-gray-800">
              PARTY ON, RIDE SAFE
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Designated driver service in Sri Lanka
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-[var(--primary)]"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-[var(--primary)]"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-[var(--primary)]"
            >
              <Twitter size={18} />
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex gap-4 text-xs text-gray-500">
            <Link
              href="/terms"
              className="transition hover:text-[var(--primary)]"
            >
              Terms & Conditions
            </Link>
            <span>|</span>
            <span>
              DriveForMe © {new Date().getFullYear()} powered by
              <a href="https://www.facebook.com/ikronyx" target="_blank">
                <span className="text-blue-800"> iKronyx</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
