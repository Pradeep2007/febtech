import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  CheckCircle,
  FileText,
  Globe,
  Users,
} from "lucide-react";

const Compliance = () => {
  const certifications = [
    {
      title: "FDA Approved Facility",
      description:
        "Our manufacturing facility meets all FDA requirements for pharmaceutical production",
      icon: Shield,
      status: "Active",
      expiryDate: "2025-12-31",
      color: "teal-prime",
    },
    {
      title: "ISO 13485:2016",
      description: "Medical devices quality management system certification",
      icon: Award,
      status: "Active",
      expiryDate: "2024-08-15",
      color: "blue",
    },
    {
      title: "GMP Compliant",
      description:
        "Good Manufacturing Practice compliance for pharmaceutical products",
      icon: CheckCircle,
      status: "Active",
      expiryDate: "2024-06-30",
      color: "orange",
    },
    {
      title: "CE Marked Products",
      description: "European Conformity marking for medical devices",
      icon: FileText,
      status: "Active",
      expiryDate: "2025-03-20",
      color: "teal-prime",
    },
    {
      title: "WHO Prequalified",
      description:
        "World Health Organization prequalification for pharmaceutical products",
      icon: Globe,
      status: "Active",
      expiryDate: "2024-11-10",
      color: "blue",
    },
    {
      title: "ISO 9001:2015",
      description: "Quality management system certification",
      icon: Award,
      status: "Active",
      expiryDate: "2024-09-25",
      color: "orange",
    },
  ];

  const regulatoryBodies = [
    {
      name: "Food and Drug Administration (FDA)",
      country: "United States",
      description: "Regulates pharmaceutical and medical device manufacturing",
      logo: "/api/placeholder/100/60",
    },
    {
      name: "European Medicines Agency (EMA)",
      country: "European Union",
      description: "Regulates medicines for human and veterinary use",
      logo: "/api/placeholder/100/60",
    },
    {
      name: "Health Canada",
      country: "Canada",
      description: "Regulates health products and food safety",
      logo: "/api/placeholder/100/60",
    },
    {
      name: "Therapeutic Goods Administration (TGA)",
      country: "Australia",
      description: "Regulates therapeutic goods including medicines",
      logo: "/api/placeholder/100/60",
    },
  ];

  const supplyChainFeatures = [
    {
      title: "Traceability",
      description:
        "Complete product traceability from raw materials to end user",
      icon: CheckCircle,
    },
    {
      title: "Quality Control",
      description: "Multi-level quality control at every stage of production",
      icon: Shield,
    },
    {
      title: "Cold Chain Management",
      description: "Temperature-controlled storage and transportation",
      icon: Award,
    },
    {
      title: "Documentation",
      description: "Comprehensive documentation and batch records",
      icon: FileText,
    },
  ];

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
              Compliance & Licensing
            </h1>
            <p className="text-xl md:text-2xl text-light-teal max-w-3xl mx-auto">
              We maintain the highest standards of regulatory compliance and
              quality assurance to ensure safe and effective healthcare products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
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
              Our Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We hold multiple international certifications that demonstrate our
              commitment to quality and regulatory compliance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 bg-${cert.color} rounded-lg flex items-center justify-center mr-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {cert.title}
                      </h3>
                      <span className="text-sm text-green-600 font-semibold">
                        {cert.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{cert.description}</p>

                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">Expires:</span>{" "}
                    {cert.expiryDate}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regulatory Bodies */}
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
              Regulatory Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We comply with regulations from major international regulatory
              bodies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regulatoryBodies.map((body, index) => (
              <motion.div
                key={body.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gray-100 rounded-xl p-6 mb-4 group-hover:bg-teal-prime transition-colors duration-300">
                  <div className="w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-teal-prime group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors">
                    {body.name}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-light-teal transition-colors">
                    {body.country}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{body.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Transparency */}
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
              Supply Chain Transparency
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We ensure complete transparency and traceability throughout our
              supply chain
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supplyChainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
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
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Assurance Process */}
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
              Quality Assurance Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive quality assurance process ensures every product
              meets the highest standards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Raw Material Testing",
                description:
                  "Comprehensive testing of all incoming raw materials",
              },
              {
                step: "02",
                title: "Manufacturing Control",
                description: "Strict quality control during production process",
              },
              {
                step: "03",
                title: "Final Product Testing",
                description:
                  "Thorough testing of finished products before release",
              },
              {
                step: "04",
                title: "Batch Documentation",
                description: "Complete documentation of all batch records",
              },
              {
                step: "05",
                title: "Storage & Distribution",
                description: "Proper storage and cold chain management",
              },
              {
                step: "06",
                title: "Post-Market Surveillance",
                description: "Ongoing monitoring of product performance",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-prime">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-teal-prime rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {process.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {process.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-4xl font-bold mb-6">
              Need Compliance Documentation?
            </h2>
            <p className="text-xl text-light-teal mb-8 max-w-3xl mx-auto">
              Contact us for detailed compliance documentation and regulatory
              information for any of our products
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Request Documentation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Compliance;

