"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  {
    label: "Services",
    children: [
      { label: "Buying", href: "#buying" },
      { label: "Selling", href: "#selling" },
      { label: "Renting", href: "#renting" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  // Lock body scroll when mobile menu open & handle scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);

    document.body.style.overflow = menuOpen ? "hidden" : "";
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const toggleMobileDropdown = (label: string) =>
    setMobileDropdown(mobileDropdown === label ? null : label);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/80 shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full" aria-label="Home">
            <Image
              src="/ritusunrise-logo.png"
              alt="Ritusunrise Real Estate logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-medium">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDesktopDropdown(item.label)}
                  onMouseLeave={() => setDesktopDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={desktopDropdown === item.label}
                  >
                    {item.label}
                    <svg
                      className="w-4 h-4 mt-[2px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {desktopDropdown === item.label && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 animate-fade-in">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="relative text-gray-700 hover:text-green-600 transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-green-600 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="#contact"
            className="hidden lg:inline-block bg-green-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-green-700 transition-colors font-semibold"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-1 font-medium">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-gray-100">
                <button
                  onClick={() => toggleMobileDropdown(item.label)}
                  className="flex w-full justify-between items-center py-3 text-gray-700 hover:text-green-600"
                >
                  <span>{item.label}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      mobileDropdown === item.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all ${
                    mobileDropdown === item.label ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {item.children.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block pl-6 pr-2 py-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded"
                      onClick={() => setMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="block py-3 border-b border-gray-100 text-gray-700 hover:text-green-600"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}

          <Link
            href="#contact"
            className="block bg-green-600 text-white px-4 py-3 rounded-lg shadow hover:bg-green-700 text-center font-semibold mt-4"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
