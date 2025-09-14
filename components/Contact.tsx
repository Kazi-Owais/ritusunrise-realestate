"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://formspree.io/f/xjkedbpw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("❌ Failed to send. Try again.");
      }
    } catch {
      toast.error("⚠️ Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      {/* Toast notifications bottom-left */}
      <Toaster position="bottom-left" reverseOrder={false} />

      <div className="container mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Get in <span className="text-green-600">Touch</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Have questions or want to work with us? Reach out and our team will
            be happy to assist you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-green-600" />
              <p className="text-gray-700">Abu Dhabi, UAE</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-green-600" />
              <p className="text-gray-700">Office: 025509616 &nbsp;|&nbsp; Mobile: 0526018711</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-green-600" />
              <p className="text-gray-700">ritusunriserealestategm@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-green-600" />
              <p className="text-gray-700">Mon - Fri: 9am - 6pm</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              type="text"
              placeholder="Enter subject"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Write your message"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 shadow-md transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
