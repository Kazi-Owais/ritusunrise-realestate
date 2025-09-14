// components/ServicesSection.tsx
import { FC } from "react";
import { Home, Tag, Key } from "lucide-react"; // swapped Building for Key icon

const services = [
  {
    title: "Property Buying Assistance",
    description:
      "We guide buyers through property selection and the entire purchasing process with personalized support.",
    icon: Home,
  },
  {
    title: "Property Selling & Marketing",
    description:
      "We maximize property exposure through strategic marketing and target buyer outreach for quick sales.",
    icon: Tag,
  },
  {
    title: "Rental & Leasing Support",
    description:
      "We help landlords and tenants with rental agreements, tenant screening, and smooth lease management.",
    icon: Key,
  },
];

const ServicesSection: FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">Our Services</h2>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                {title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
