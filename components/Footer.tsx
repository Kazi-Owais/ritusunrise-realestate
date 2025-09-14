import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Image
              src="/ritusunrise-logo.png"
              alt="Ritusunrise Real Estate"
              width={150}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
            <div>
              <p className="text-sm">&copy; {new Date().getFullYear()} Ritusunrise Real Estate</p>
              <p className="text-xs text-gray-400">All rights reserved</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center hidden md:block">
            <p className="text-sm text-gray-400 italic">
              Your trusted partner in real estate investments across Abu Dhabi
            </p>
          </div>

          {/* WhatsApp Link */}
          <div className="flex justify-center md:justify-end">
            <a
              href="https://wa.me/971501234567" // replace with your real WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
            </a>
          </div>
        </div>

        {/* Mobile tagline */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-400 md:hidden">
          <p>Your trusted partner in real estate investments across Abu Dhabi</p>
        </div>
      </div>
    </footer>
  );
}
