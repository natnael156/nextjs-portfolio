"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, Briefcase, Code, FolderOpen, Award, Mail, 
  Settings, Save, Eye, EyeOff, Lock, LogOut 
} from "lucide-react";
import { 
  ExperienceTab, 
  SkillsTab, 
  ProjectsTab, 
  EducationTab, 
  ContactTab,
  CertificationsTab,
  SettingsTab 
} from "./tabs";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("skills");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      // Fetch the current admin password from database
      const response = await fetch('/api/admin/password');
      const data = await response.json();

      if (data.success) {
        const correctPassword = data.data.password;
        if (password === correctPassword) {
          setIsAuthenticated(true);
        } else {
          alert("Incorrect password!");
        }
      } else {
        alert("Error checking password. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert("Error logging in. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const tabs = [
    { id: "skills", name: "Skills", icon: Code },
    { id: "profile", name: "Profile", icon: User },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: Award },
    { id: "certifications", name: "Certifications", icon: Award },
    { id: "projects", name: "Projects", icon: FolderOpen },
    { id: "contact", name: "Contact", icon: Mail },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="glass p-8 rounded-3xl">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <Lock size={40} className="text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
              <p className="text-gray-400">Enter password to access</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoggingIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold disabled:opacity-50"
              >
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Default password: admin123
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {/* Header */}
      <div className="glass border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold gradient-text">Portfolio Admin</h1>
              <p className="text-sm text-gray-400">Manage your portfolio content</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-xl text-red-400 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass p-4 rounded-2xl space-y-2 sticky top-6">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "hover:bg-white/5 text-gray-400"
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-4">
            <div className="glass p-8 rounded-3xl">
              {activeTab === "skills" && <SkillsTab />}
              {activeTab === "profile" && <ProfileTab />}
              {activeTab === "experience" && <ExperienceTab />}
              {activeTab === "education" && <EducationTab />}
              {activeTab === "certifications" && <CertificationsTab />}
              {activeTab === "projects" && <ProjectsTab />}
              {activeTab === "contact" && <ContactTab />}
              {activeTab === "settings" && <SettingsTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Tab Component
function ProfileTab() {
  const [formData, setFormData] = useState({
    name: "Your Name",
    title: "Front-End Developer",
    bio: "A passionate developer...",
    location: "San Francisco, CA",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    image: "",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    yearsExperience: 5,
    projectsCompleted: 50,
    happyClients: 30,
    aboutDescription: "",
    availableForWork: true,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Load existing profile data
  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setFormData({
            name: data.data.name || "Your Name",
            title: data.data.title || "Front-End Developer",
            bio: data.data.bio || "A passionate developer...",
            location: data.data.location || "San Francisco, CA",
            email: data.data.email || "hello@example.com",
            phone: data.data.phone || "+1 (555) 123-4567",
            image: data.data.image || "",
            github: data.data.github || "https://github.com",
            linkedin: data.data.linkedin || "https://linkedin.com",
            yearsExperience: data.data.yearsExperience || 5,
            projectsCompleted: data.data.projectsCompleted || 50,
            happyClients: data.data.happyClients || 30,
            aboutDescription: data.data.aboutDescription || "",
            availableForWork: data.data.availableForWork !== false,
          });
          if (data.data.image) {
            setImagePreview(data.data.image);
          }
        }
      })
      .catch(err => console.error('Error loading profile:', err));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    console.log('Saving profile data:', formData);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log('Save response:', data);
      
      if (data.success) {
        alert("Profile saved successfully! ✅\n\nRefresh your main page to see the changes.");
      } else {
        alert("Error saving profile: " + data.error);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert("Error saving profile: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Profile Settings</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold disabled:opacity-50"
        >
          <Save size={18} />
          {loading ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Job Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-gray-300">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
          />
        </div>
      </div>

      {/* About Section Fields */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">About Section</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.availableForWork}
                onChange={(e) => setFormData({ ...formData, availableForWork: e.target.checked })}
                className="w-5 h-5 rounded border-gray-700 bg-white/5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-300">Available for Work Badge</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-300">About Description</label>
          <textarea
            value={formData.aboutDescription}
            onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
            rows={6}
            placeholder="Write a detailed description about yourself, your skills, and what you do when not coding..."
            className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">This will appear in the About section. You can use line breaks for paragraphs.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Years Experience</label>
            <input
              type="number"
              value={formData.yearsExperience}
              onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Projects Completed</label>
            <input
              type="number"
              value={formData.projectsCompleted}
              onChange={(e) => setFormData({ ...formData, projectsCompleted: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Happy Clients</label>
            <input
              type="number"
              value={formData.happyClients}
              onChange={(e) => setFormData({ ...formData, happyClients: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">Social Links</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">GitHub URL</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/yourusername"
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/yourusername"
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


