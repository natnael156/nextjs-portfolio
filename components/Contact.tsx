"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  // Fetch profile data for contact info
  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProfile(data.data);
        }
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting contact form...');
      
      // Send to Formspree for email delivery
      const formspreeResponse = await fetch('https://formspree.io/f/movzdlrb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Also save to database
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).catch(err => console.log('DB save failed (non-critical):', err));

      if (formspreeResponse.ok) {
        setIsSuccess(true);
        console.log('Message sent successfully!');
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      } else {
        const errorData = await formspreeResponse.json();
        console.error('Failed to send:', errorData);
        alert(`Failed to send message. Please email me directly at: ${profile?.email || 'natnaeltefera156@gmail.com'}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert(`Network error. Please email me directly at: ${profile?.email || 'natnaeltefera156@gmail.com'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { 
      icon: Mail, 
      text: profile?.email || "hello@example.com", 
      href: `mailto:${profile?.email || "hello@example.com"}`,
      color: "from-blue-500 to-cyan-500",
      label: "Email"
    },
    { 
      icon: Phone, 
      text: profile?.phone || "+1 (555) 123-4567", 
      href: `tel:${profile?.phone?.replace(/\D/g, '') || "15551234567"}`,
      color: "from-green-500 to-emerald-500",
      label: "Phone"
    },
    { 
      icon: MapPin, 
      text: profile?.location || "San Francisco, CA", 
      href: "#",
      color: "from-purple-500 to-pink-500",
      label: "Location"
    },
  ];

  const socialLinks = [
    { icon: Github, href: profile?.github || "https://github.com", label: "GitHub", color: "hover:text-gray-400" },
    { icon: Linkedin, href: profile?.linkedin || "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-400" },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">


      <div className="container mx-auto px-6 z-10 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Send size={40} className="text-white" />
            </div>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind? Let&apos;s collaborate and create something extraordinary together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Info - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 gradient-text">Let&apos;s Connect</h3>
            
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-3 md:gap-5 glass p-4 md:p-5 rounded-2xl group relative overflow-hidden"
                  style={{
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.1)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    }}
                  />
                  
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <item.icon size={20} className="text-white md:w-6 md:h-6" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm md:text-lg font-semibold text-white break-words">{item.text}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-300">Follow Me</h4>
              <div className="flex gap-3 md:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-12 h-12 glass rounded-xl flex items-center justify-center ${social.color} transition-colors`}
                    title={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-3xl relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
              />
              
              <div className="relative z-10 space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-3 text-gray-300">
                    Your Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white placeholder-gray-500"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-3 text-gray-300">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white placeholder-gray-500"
                    placeholder="abc@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-3 text-gray-300">
                    Your Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all resize-none text-white placeholder-gray-500"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 md:px-8 py-4 md:py-5 rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 transition-all relative overflow-hidden ${
                    isSuccess
                      ? "bg-green-600"
                      : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  }`}
                  style={{
                    boxShadow: isSuccess
                      ? "0 0 40px rgba(34, 197, 94, 0.5)"
                      : "0 0 40px rgba(59, 130, 246, 0.5)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        ✓
                      </motion.span>
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={22} />
                      <span>Send Message</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                        initial={{ x: "100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                      
                    </>
                  )}
                </motion.button>

                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-semibold"
                  >
                    Thank you! Your email reached its destination I&apos;ll get back to you Within 24 hour. 🎉
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
