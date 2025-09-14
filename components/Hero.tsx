"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effect for background image
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] md:h-[90vh] max-h-screen overflow-hidden flex items-center"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/image.png"
          alt="Luxury Property in Abu Dhabi"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-blue-900/50"></div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 drop-shadow-lg">
            Discover Your Dream{" "}
            <span className="text-green-500">Property</span> in Abu Dhabi
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Find the perfect home, investment property, or commercial space with{" "}
            <span className="font-semibold">Ritusunrise Real Estate</span>. Your
            trusted partner in the Abu Dhabi real estate market.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#properties"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 text-center shadow-lg w-full sm:w-auto"
            >
              View Properties
            </a>
            <a
              href="#contact"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 text-center w-full sm:w-auto"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-12 border-4 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white mt-2 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
