import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import toast from "react-hot-toast";
import { addContactMessage } from "../firebase/firestore";
import { sendContactNotification } from "../utils/emailService";
import { runFirebaseDiagnostics } from "../utils/firebaseDebug";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Run Firebase diagnostics on component mount (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Running Firebase diagnostics...');
      runFirebaseDiagnostics();
    }
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('📤 Submitting contact form...');
      
      // Save to Firestore with enhanced error handling
      const docId = await addContactMessage(data);
      console.log('✅ Firestore save successful, document ID:', docId);

      // Send email notification to admin
      try {
        await sendContactNotification(data);
        console.log('✅ Email notification sent successfully');
      } catch (emailError) {
        console.warn('⚠️ Email notification failed, but form data was saved:', emailError);
        // Don't fail the entire operation if email fails
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      console.error("❌ Error sending message:", error);
      
      // Use the enhanced error message if available
      const errorMessage = error.message || "Failed to send message. Please try again.";
      toast.error(errorMessage);
      
      // Log additional debugging info
      if (error.originalError) {
        console.error("Original error:", error.originalError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      color: "hover:text-pink-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com",
      color: "hover:text-blue-700",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com",
      color: "hover:text-red-600",
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl text-light-teal max-w-3xl mx-auto px-4">
            Have questions about our medical products? We're here to help. Reach
            out to us and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-60 items-start">
          {/* Contact Form */}
          <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-xl border-2 border-light-teal">
            <h3 className="text-xl sm:text-2xl font-semibold text-teal-prime mb-4 sm:mb-6">
              Send us a Message
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 sm:space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-blue mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full px-3 py-2 sm:py-3 border-2 border-light-teal rounded-lg focus:ring-2 focus:ring-orange focus:border-orange transition-colors"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-blue mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full px-3 py-2 sm:py-3 border-2 border-light-teal rounded-lg focus:ring-2 focus:ring-orange focus:border-orange transition-colors"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#4467A3] mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 border-2 border-[#80CBC4] rounded-lg focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-colors"
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[#4467A3] mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full px-4 py-3 border-2 border-[#80CBC4] rounded-lg focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Information</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#4467A3] mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message", { required: "Message is required" })}
                  className="w-full px-4 py-3 border-2 border-[#80CBC4] rounded-lg focus:ring-2 focus:ring-[#FF7043] focus:border-[#FF7043] transition-colors resize-none"
                  placeholder="Please describe your inquiry in detail..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF7043] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-[#FF7043]/90 focus:ring-2 focus:ring-[#FF7043] focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 flex flex-col justify-center mt-8 lg:mt-0">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-light-teal">info@medicalcompany.com</p>
                    <p className="text-light-teal">
                      support@medicalcompany.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Phone</h4>
                    <p className="text-light-teal">+1 (555) 123-4567</p>
                    <p className="text-light-teal">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Address</h4>
                    <p className="text-light-teal">
                      123 Medical Plaza
                      <br />
                      Healthcare District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Follow Us
              </h3>
              <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 sm:p-3 bg-white rounded-full shadow-lg transition-all duration-200 text-blue hover:bg-orange hover:text-white hover:scale-110`}
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
