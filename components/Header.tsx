"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".hamburger-button")
      ) {
        setIsMenuOpen(false);
      }
      if (!target.closest(".dropdown")) {
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setOpenMobileDropdown(null);
      }
    };

    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  const navItems = [
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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/80 shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full">
            <Image
              src="/ritusunrise-logo.png"
              alt="Ritusunrise Real Estate"
              width={200}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold relative">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative dropdown"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors">
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
                  {openDropdown === item.label && (
                    <div className="lg:hidden absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
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
                  href={item.href}
                  className="relative text-gray-700 hover:text-green-600 transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-green-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="#contact"
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-green-700 transition-colors font-bold"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="hamburger-button lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "max-h-screen py-4 opacity-100 visible" 
            : "max-h-0 py-0 opacity-0 invisible"
        }`}
        style={{
          transition: 'max-height 0.3s ease-in-out, opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, padding 0.3s ease-in-out'
        }}
      >
        <div className="container mx-auto px-4 space-y-1 font-medium overflow-y-auto max-h-[calc(100vh-80px)]">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-gray-100">
                <button
                  onClick={() => toggleMobileDropdown(item.label)}
                  className="flex justify-between items-center w-full text-left py-3 text-gray-700 hover:text-green-600 focus:outline-none"
                >
                  <span>{item.label}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openMobileDropdown === item.label ? 'transform rotate-180' : ''
                    }`}
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
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openMobileDropdown === item.label ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="pl-4 pb-2 space-y-1">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block py-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded px-2"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenMobileDropdown(null);
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 border-b border-gray-100 text-gray-700 hover:text-green-600"
                onClick={() => {
                  setIsMenuOpen(false);
                  setOpenMobileDropdown(null);
                }}
              >
                {item.label}
              </Link>
            )
          )}
<Link
            href="#contact"
            className="block bg-green-600 text-white px-4 py-3 rounded-lg shadow hover:bg-green-700 transition-colors text-center font-semibold mt-4"
            onClick={() => {
              setIsMenuOpen(false);
              setOpenMobileDropdown(null);
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
