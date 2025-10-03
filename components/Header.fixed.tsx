"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";

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
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown(mobileDropdown === label ? null : label);
  };

  // Show loading state on server
  if (!isMounted) {
    return (
      <header className="fixed w-full z-50 bg-white shadow-md py-2">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="w-32 h-8 bg-gray-200 rounded"></div>
            <div className="hidden md:flex items-center space-x-8">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="w-16 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="md:hidden w-8 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
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
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <Button
                      className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors"
                      onClick={() => setDesktopDropdown(desktopDropdown === item.label ? null : item.label)}
                      aria-haspopup="true"
                      aria-expanded={desktopDropdown === item.label}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          desktopDropdown === item.label ? 'rotate-180' : ''
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
                    </Button>
                    <div
                      className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 transition-all duration-200 overflow-hidden ${
                        desktopDropdown === item.label
                          ? 'opacity-100 translate-y-0 visible'
                          : 'opacity-0 -translate-y-2 invisible'
                      }`}
                    >
                      {item.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                          onClick={() => setDesktopDropdown(null)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-green-600"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transform transition-all duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: scrolled ? '4rem' : '5rem' }}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="space-y-2">
                  <Button
                    className="flex items-center justify-between w-full text-left text-gray-700"
                    onClick={() => toggleMobileDropdown(item.label)}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        mobileDropdown === item.label ? 'rotate-180' : ''
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
                  </Button>
                  <div
                    className={`overflow-hidden transition-all pl-4 ${
                      mobileDropdown === item.label ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    {item.children.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block py-2 text-gray-600 hover:text-green-600"
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
                  href={item.href || "#"}
                  className="block py-2 text-gray-700 hover:text-green-600"
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
          </nav>
        </div>
      </div>
    </header>
  );
}
