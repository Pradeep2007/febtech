import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users, Package } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const categories = [
    {
      name: "Sysmax-Biotsystems",
      icon: Package,
      description: "Advanced diagnostic equipment",
    },
    { name: "Rest Inc.", icon: Shield, description: "Patient care solutions" },
    {
      name: "Pharmaceuticals",
      icon: Award,
      description: "Quality medicines & drugs",
    },
    {
      name: "Medical Equipment",
      icon: Package,
      description: "Professional medical devices",
    },
  ];

  const complianceItems = [
    "FDA Approved",
    "ISO 13485 Certified",
    "GMP Compliant",
    "CE Marked",
  ];

  const partnerBrands = [
    "Johnson & Johnson",
    "Pfizer",
    "Medtronic",
    "Siemens Healthineers",
    "GE Healthcare",
    "Baxter",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-44">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full"
        />
      </div>

      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Trusted
            <span className="block text-light-teal">Healthcare Partner</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Providing premium medical supplies, pharmaceuticals, and equipment
            with uncompromising quality and regulatory compliance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/products"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Explore Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/about"
              className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-teal-prime"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors duration-300"
              >
                <Icon className="w-8 h-8 text-light-teal mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">
                  {category.name}
                </h3>
                <p className="text-white/70 text-xs">{category.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Compliance & Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Compliance */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Shield className="mr-2" size={20} />
              Compliance & Certifications
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {complianceItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="bg-white/20 rounded-lg p-2 text-center"
                >
                  <span className="text-white text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Partner Brands */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Users className="mr-2" size={20} />
              Partner Brands
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {partnerBrands.map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="bg-white/20 rounded-lg p-2 text-center"
                >
                  <span className="text-white text-sm font-medium">
                    {brand}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
