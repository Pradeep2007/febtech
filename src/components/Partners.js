import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Star, Quote, Building2, Award, Globe } from "lucide-react";
import { getPartners, getTestimonials } from "../firebase/firestore";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partnersData, testimonialsData] = await Promise.all([
          getPartners(),
          getTestimonials(),
        ]);
        setPartners(partnersData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback data
        setPartners([
          {
            id: "1",
            name: "Johnson & Johnson",
            logo: "/api/placeholder/200/100",
            description: "Global healthcare company",
            category: "Pharmaceuticals",
            partnershipYears: 8,
          },
          {
            id: "2",
            name: "Pfizer Inc.",
            logo: "/api/placeholder/200/100",
            description: "Leading pharmaceutical corporation",
            category: "Pharmaceuticals",
            partnershipYears: 6,
          },
          {
            id: "3",
            name: "Medtronic",
            logo: "/api/placeholder/200/100",
            description: "Medical technology company",
            category: "Medical Devices",
            partnershipYears: 5,
          },
          {
            id: "4",
            name: "Siemens Healthineers",
            logo: "/api/placeholder/200/100",
            description: "Medical technology solutions",
            category: "Medical Devices",
            partnershipYears: 7,
          },
          {
            id: "5",
            name: "GE Healthcare",
            logo: "/api/placeholder/200/100",
            description: "Healthcare technology company",
            category: "Medical Devices",
            partnershipYears: 4,
          },
          {
            id: "6",
            name: "Baxter International",
            logo: "/api/placeholder/200/100",
            description: "Healthcare products and services",
            category: "Healthcare Products",
            partnershipYears: 9,
          },
        ]);

        setTestimonials([
          {
            id: "1",
            name: "Dr. Sarah Johnson",
            position: "Chief Medical Officer",
            company: "City General Hospital",
            content:
              "MediCare Solutions has been our trusted partner for over 5 years. Their quality products and reliable service have been instrumental in our patient care.",
            rating: 5,
            image: "/api/placeholder/80/80",
          },
          {
            id: "2",
            name: "Michael Chen",
            position: "Procurement Manager",
            company: "Regional Medical Center",
            content:
              "The compliance and quality standards maintained by MediCare are exceptional. We never have to worry about regulatory issues with their products.",
            rating: 5,
            image: "/api/placeholder/80/80",
          },
          {
            id: "3",
            name: "Dr. Emily Rodriguez",
            position: "Director of Pharmacy",
            company: "University Hospital",
            content:
              "Their pharmaceutical products are consistently high quality and their supply chain management is outstanding. Highly recommended.",
            rating: 5,
            image: "/api/placeholder/80/80",
          },
        ]);
      }
    };

    fetchData();
  }, []);

  const partnerCategories = [
    "All Partners",
    "Pharmaceuticals",
    "Medical Devices",
    "Healthcare Products",
    "Diagnostics",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Partners");

  const filteredPartners =
    selectedCategory === "All Partners"
      ? partners
      : partners.filter((partner) => partner.category === selectedCategory);

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Partners & Clientele
            </h1>
            <p className="text-xl md:text-2xl text-light-teal max-w-3xl mx-auto">
              Trusted by leading healthcare organizations and pharmaceutical
              companies worldwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Categories Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {partnerCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category
                    ? "bg-teal-prime text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with industry leaders to deliver the best healthcare
              solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-teal-prime to-blue rounded-lg flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-prime transition-colors">
                    {partner.name}
                  </h3>

                  <p className="text-gray-600 mb-3">{partner.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
                      {partner.category}
                    </span>
                    <span className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {partner.partnershipYears} years
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from healthcare professionals who trust us with their supply
              needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-light-gray rounded-xl p-6 relative"
              >
                <Quote className="w-8 h-8 text-teal-prime mb-4" />

                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-prime to-blue rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.position}
                    </p>
                    <p className="text-sm text-teal-prime font-semibold">
                      {testimonial.company}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive solutions that help our partners succeed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "Access to international markets and regulatory expertise",
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description:
                  "Rigorous quality control and compliance standards",
              },
              {
                icon: Users,
                title: "Expert Support",
                description:
                  "Dedicated team of healthcare and regulatory experts",
              },
              {
                icon: Building2,
                title: "Reliable Supply",
                description: "Consistent and reliable supply chain management",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-teal-prime rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="gradient-bg py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Become Our Partner</h2>
            <p className="text-xl text-light-teal mb-8 max-w-3xl mx-auto">
              Join our network of trusted partners and help us deliver better
              healthcare solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Partner With Us
              </button>
              <button className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-teal-prime">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partners;

