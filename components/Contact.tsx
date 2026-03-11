"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

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
            Get in <span className="text-accent">Touch</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Have questions or want to work with us? Reach out and our team will
            be happy to assist you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-accent" />
              <p className="text-gray-700">Abu Dhabi, UAE</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-accent" />
              <p className="text-gray-700">Office: 025509616 &nbsp;|&nbsp; Mobile: 0526018711</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-accent" />
              <p className="text-gray-700">ritusunriserealestategm@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-accent" />
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
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Subject</label>
            <Input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              type="text"
              placeholder="Enter subject"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <Input
              as="textarea"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Write your message"
              required
              className="resize-y min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </section>
  );
}
