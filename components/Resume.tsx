"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Download, Briefcase, GraduationCap, Award, Code } from "lucide-react";

const defaultExperience = [
  {
    title: "Senior Front-End Developer",
    company: "Tech Innovations Inc",
    period: "2022 - Present",
    location: "San Francisco, CA",
    description: "Leading front-end development for enterprise applications using React, Next.js, and TypeScript. Architecting scalable solutions and mentoring development teams.",
  },
  {
    title: "Front-End Developer",
    company: "Creative Digital Studio",
    period: "2020 - 2022",
    location: "Remote",
    description: "Developed responsive web applications and e-commerce platforms for various clients. Focused on performance optimization and user experience.",
  },
  {
    title: "Junior Developer",
    company: "Startup Ventures",
    period: "2019 - 2020",
    location: "New York, NY",
    description: "Built MVPs and features in a fast-paced startup environment. Collaborated with cross-functional teams to deliver quality products.",
  },
];

const defaultEducation = [
  {
    degree: "Bachelor of Computer Science",
    institution: "University of Technology",
    period: "2015 - 2019",
    location: "California, USA",
    description: "Specialized in Web Development, Software Engineering, and Human-Computer Interaction",
  },
];

const defaultCertifications = [
  "AWS Certified Developer - Associate",
  "Google Cloud Professional Developer",
  "Meta Front-End Developer Professional",
  "Advanced React Patterns & Best Practices",
  "TypeScript: Advanced Types & Patterns",
  "Web Accessibility Specialist (IAAP)",
];

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Fetch Experience
    fetch('/api/experience')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setExperience(data.data);
        }
      })
      .catch(err => {
        console.error('Error fetching experience:', err);
      });

    // Fetch Education
    fetch('/api/education')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEducation(data.data);
        }
      })
      .catch(err => {
        console.error('Error fetching education:', err);
      });

    // Fetch Certifications
    fetch('/api/certifications')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Convert certification objects to strings for display
          setCertifications(data.data.map((cert: any) => cert.name));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching certifications:', err);
        setLoading(false);
      });
  }, []);

  const handleDownload = async () => {
    if (downloading) return; // Prevent multiple clicks
    
    setDownloading(true);
    
    try {
      // Fetch the file as a blob to ensure proper download
      const response = await fetch('/resume.pdf');
      
      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = "Natnael_Tefera_Resume.pdf";
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      // Show success message
      setTimeout(() => {
        setDownloading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error downloading resume:', error);
      
      // Fallback: Try opening in new tab
      try {
        window.open('/resume.pdf', '_blank');
        setDownloading(false);
      } catch (fallbackError) {
        console.error('Fallback download failed:', fallbackError);
        alert('Unable to download resume. Please try:\n1. Right-click the button and select "Save link as..."\n2. Or contact me directly for a copy.');
        setDownloading(false);
      }
    }
  };

  return (
    <section id="resume" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Professional experience and qualifications
          </p>
          
          <motion.button
            onClick={handleDownload}
            disabled={downloading}
            whileHover={!downloading ? { scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)" } : {}}
            whileTap={!downloading ? { scale: 0.95 } : {}}
            className={`px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full font-bold text-lg inline-flex items-center gap-3 shadow-2xl relative overflow-hidden group ${downloading ? 'opacity-75 cursor-wait' : 'cursor-pointer'}`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
              initial={{ x: "100%" }}
              whileHover={!downloading ? { x: "0%" } : {}}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              animate={downloading ? { rotate: 360 } : {}}
              transition={downloading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
            >
              <Download size={22} className="relative z-10" />
            </motion.div>
            <span className="relative z-10">
              {downloading ? 'Downloading...' : 'Download Resume'}
            </span>
          </motion.button>
          
          <p className="text-sm text-gray-500 mt-4">
            Tip: Right-click the button above and select &quot;Save link as...&quot; if download doesn&apos;t start
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-10">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl"
            >
              <Briefcase className="text-white" size={32} />
            </motion.div>
            <h3 className="text-4xl font-bold gradient-text">Work Experience</h3>
          </div>

          <div className="space-y-6">
            {experience.length === 0 ? (
              <div className="text-center py-12 glass rounded-2xl">
                <p className="text-xl text-gray-400">No work experience added yet.</p>
                <p className="text-gray-500 mt-2">Add your experience from the admin panel!</p>
              </div>
            ) : (
              experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass p-8 rounded-2xl relative overflow-hidden group"
                style={{
                  boxShadow: "0 10px 40px rgba(59, 130, 246, 0.2)",
                }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Floating particles effect */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  >
                    <span className="text-white font-bold">💼 {job.period}</span>
                  </motion.div>
                  
                  <h4 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {job.title}
                  </h4>
                  <p className="text-blue-400 font-bold text-xl mb-2">{job.company}</p>
                  <p className="text-gray-400 text-lg mb-4 font-semibold">📍 {job.location}</p>
                  <p className="text-gray-300 text-lg leading-relaxed">{job.description}</p>
                </div>

                {/* Corner decoration */}
                <motion.div
                  className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-tl-full"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))
            )}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg"
              >
                <GraduationCap className="text-white" size={32} />
              </motion.div>
              <h3 className="text-4xl font-bold gradient-text">Education</h3>
            </div>

            {education.length === 0 ? (
              <div className="text-center py-12 glass rounded-2xl">
                <p className="text-xl text-gray-400">No education added yet.</p>
                <p className="text-gray-500 mt-2">Add your education from the admin panel!</p>
              </div>
            ) : (
              education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                className="glass p-10 rounded-3xl relative overflow-hidden group"
                style={{
                  boxShadow: "0 20px 60px rgba(168, 85, 247, 0.3)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Floating particles effect */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  >
                    <span className="text-white font-bold">🎓 Degree</span>
                  </motion.div>
                  
                  <h4 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    {edu.degree}
                  </h4>
                  <p className="text-purple-400 font-bold text-xl mb-3">{edu.institution}</p>
                  <p className="text-gray-400 text-lg mb-5 font-semibold">📍 {edu.location} • {edu.period}</p>
                  <p className="text-gray-300 text-lg leading-relaxed">{edu.description}</p>
                </div>

                {/* Corner decoration */}
                <motion.div
                  className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-tl-full"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))
            )}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl shadow-lg"
              >
                <Award className="text-white" size={32} />
              </motion.div>
              <h3 className="text-4xl font-bold gradient-text">Certifications</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {certifications.length === 0 ? (
                <div className="col-span-2 text-center py-12 glass rounded-2xl">
                  <p className="text-xl text-gray-400">No certifications added yet.</p>
                  <p className="text-gray-500 mt-2">Add your certifications from the admin panel!</p>
                </div>
              ) : (
                certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.08, y: -8, rotateX: 5 }}
                  className="glass p-6 rounded-2xl relative overflow-hidden group"
                  style={{
                    boxShadow: "0 10px 30px rgba(236, 72, 153, 0.25)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Glowing orb */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl opacity-20"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 via-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <Award size={24} className="text-white" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.span 
                        className="font-bold text-white text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-300"
                      >
                        {cert}
                      </motion.span>
                    </div>

                    {/* Check mark badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, type: "spring" }}
                      className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="text-white font-bold"
                      >
                        ✓
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Bottom shine effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
