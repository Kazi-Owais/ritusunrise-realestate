"use client";
import { motion } from "framer-motion";
import { Building2, Users, Home } from "lucide-react";

export default function About() {
  const stats = [
    { icon: Building2, value: "10+", label: "Years of Experience" },
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Home, value: "300+", label: "Properties Listed" },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto text-center px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6 text-gray-800"
        >
          About <span className="text-green-600">Ritusunrise Real Estate</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-3xl mx-auto text-lg"
        >
          With over a decade of expertise, Ritusunrise Real Estate has been
          guiding clients across the Abu Dhabi with trust and dedication. Our mission
          is to make your property journey smooth, transparent, and rewarding.
        </motion.p>

        {/* Stats */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 px-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-green-50 p-4 rounded-full mb-4">
                <s.icon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{s.value}</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
