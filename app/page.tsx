import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// This page is statically generated at build time
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* Services Section */}
        <section id="services">
          <Services />
        </section>

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>

        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </main>

      <Footer />
    </>
  );
}
