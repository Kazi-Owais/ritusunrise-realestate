import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#24272E] text-gray-300 py-10">
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

          {/* WhatsApp Link (Removed empty button) */}
          <div className="flex justify-center md:justify-end">
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
