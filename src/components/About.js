import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Target, Eye, Award, Users, Shield } from "lucide-react";
import { getTeam } from "../firebase/firestore";

const About = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamData = await getTeam();
        setTeam(teamData);
      } catch (error) {
        console.error("Error fetching team:", error);
        // Fallback data
        setTeam([
          {
            id: "1",
            name: "Dr. Sarah Johnson",
            position: "Chief Medical Officer",
            image: "/api/placeholder/300/300",
            bio: "20+ years in pharmaceutical industry",
          },
          {
            id: "2",
            name: "Michael Chen",
            position: "Operations Director",
            image: "/api/placeholder/300/300",
            bio: "Expert in supply chain management",
          },
          {
            id: "3",
            name: "Dr. Emily Rodriguez",
            position: "Quality Assurance Lead",
            image: "/api/placeholder/300/300",
            bio: "Specialist in regulatory compliance",
          },
        ]);
      }
    };

    fetchTeam();
  }, []);

  const stats = [
    { number: "15+", label: "Years Experience", icon: Calendar },
    { number: "500+", label: "Products Supplied", icon: Award },
    { number: "1000+", label: "Happy Clients", icon: Users },
    { number: "99.9%", label: "Quality Rating", icon: Shield },
  ];

  const certifications = [
    "FDA Approved Facility",
    "ISO 13485:2016 Certified",
    "GMP Compliant",
    "CE Marked Products",
    "WHO Prequalified",
    "ISO 9001:2015",
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
              About MediCare
            </h1>
            <p className="text-xl md:text-2xl text-light-teal max-w-3xl mx-auto">
              Founded in 2008, we are a leading provider of medical supplies and
              pharmaceutical products, committed to excellence in healthcare
              delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Since our founding in 2008, MediCare Solutions has been at the
                forefront of medical supply distribution. We started with a
                simple mission: to provide healthcare professionals with
                reliable, high-quality medical supplies and pharmaceuticals.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we serve over 1,000 healthcare facilities across the
                region, maintaining the highest standards of quality and
                regulatory compliance. Our commitment to excellence has made us
                a trusted partner in the healthcare industry.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-teal-prime text-white px-6 py-3 rounded-lg">
                  <span className="font-semibold">Founded: 2008</span>
                </div>
                <div className="bg-orange text-white px-6 py-3 rounded-lg">
                  <span className="font-semibold">15+ Years Experience</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-teal-prime to-blue rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <Icon className="w-8 h-8 mx-auto mb-2 text-light-teal" />
                        <div className="text-3xl font-bold">{stat.number}</div>
                        <div className="text-sm text-light-teal">
                          {stat.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
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
              Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to healthcare excellence drives everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-prime rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide healthcare professionals with reliable, high-quality
                medical supplies and pharmaceuticals while maintaining the
                highest standards of safety, compliance, and customer service.
                We are committed to supporting the healthcare community in
                delivering exceptional patient care.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the leading provider of medical supplies and
                pharmaceuticals in the region, recognized for our innovation,
                reliability, and commitment to improving healthcare outcomes. We
                envision a future where every healthcare facility has access to
                the supplies they need to provide exceptional care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
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
              Compliance & Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards of regulatory compliance and
              quality assurance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <Award className="w-12 h-12 text-teal-prime mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">{cert}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals who make our success possible
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-teal-prime to-blue rounded-full flex items-center justify-center text-white text-6xl font-bold group-hover:scale-105 transition-transform duration-300">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-teal-prime font-semibold mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
