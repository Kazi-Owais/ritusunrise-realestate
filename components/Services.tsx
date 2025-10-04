// components/ServicesSection.tsx
import { FC } from "react";
import { Home, Tag, Key } from "lucide-react"; // swapped Building for Key icon

const services = [
  {
    title: "Property Buying & Investment",
    description:
      "Our expert team guides you through every step of purchasing your dream property in Abu Dhabi. From initial consultation to final paperwork, we provide comprehensive support including market analysis, property viewings, legal assistance, and negotiation. We specialize in both residential and commercial properties, helping you make informed investment decisions in Abu Dhabi's dynamic real estate market.",
    icon: Home,
  },
  {
    title: "Property Sales & Marketing",
    description:
      "Maximize your property's value with our strategic marketing solutions. We leverage cutting-edge digital marketing, professional photography, virtual tours, and our extensive network of potential buyers to ensure your property stands out. Our team provides accurate valuations, staging advice, and handles all negotiations to secure the best possible price in the shortest time.",
    icon: Tag,
  },
  {
    title: "Rental & Property Management",
    description:
      "Streamline your rental experience with our comprehensive property management services. We handle tenant screening, lease agreements, rent collection, and property maintenance. Our 24/7 support ensures your property is well-maintained and your investment is protected, while our transparent processes make renting hassle-free for both landlords and tenants.",
    icon: Key,
  },
  {
    title: "Off-Plan Investments",
    description:
      "Discover lucrative off-plan opportunities in Abu Dhabi's most prestigious developments. We provide exclusive access to pre-construction projects with attractive payment plans and potential high returns. Our market insights help you identify the best off-plan properties that match your investment goals and budget.",
    icon: Home,
  },
  {
    title: "Property Valuation & Consultation",
    description:
      "Get accurate property valuations and expert real estate advice. Our comprehensive market analysis considers current trends, location factors, and property conditions to provide you with realistic pricing. Whether you're buying, selling, or refinancing, our consultation services help you make well-informed real estate decisions.",
    icon: Tag,
  },
  {
    title: "Relocation Services",
    description:
      "Settle into Abu Dhabi with ease using our relocation services. We assist with finding the perfect neighborhood, school searches, visa processing, and cultural orientation. Our personalized approach ensures a smooth transition for individuals and families moving to the UAE capital.",
    icon: Key,
  },
];

const ServicesSection: FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">Our Services</h2>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 sm:grid-cols-1 lg:grid-cols-2">
          <div className="lg:col-span-2 text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comprehensive Real Estate Solutions in Abu Dhabi</h3>
            <p className="text-gray-600 max-w-4xl mx-auto">
              At Ritusunrise Real Estate, we offer a full spectrum of professional real estate services tailored to meet the diverse needs of our clients in the Abu Dhabi property market. With years of experience and in-depth local market knowledge, we provide expert guidance whether you're buying, selling, renting, or investing in Abu Dhabi's dynamic real estate sector.
            </p>
          </div>
          {services.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="h-full rounded-2xl bg-white p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <Icon className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
