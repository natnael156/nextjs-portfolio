"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, Edit } from "lucide-react";

// Experience Tab
export function ExperienceTab() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    period: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const res = await fetch('/api/experience');
      const data = await res.json();
      if (data.success) setExperiences(data.data);
    } catch (err) {
      console.error('Error loading experiences:', err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const url = '/api/experience';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, _id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        alert(editingId ? 'Updated!' : 'Added!');
        setFormData({ title: "", company: "", period: "", location: "", description: "" });
        setEditingId(null);
        loadExperiences();
      }
    } catch (err) {
      alert('Error: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await fetch(`/api/experience?id=${id}`, { method: 'DELETE' });
      loadExperiences();
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  const handleEdit = (exp: any) => {
    setEditingId(exp._id);
    setFormData({
      title: exp.title,
      company: exp.company,
      period: exp.period,
      location: exp.location,
      description: exp.description,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Experience Management</h2>

      {/* Form */}
      <div className="glass p-6 rounded-2xl space-y-4">
        <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Experience</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Period (e.g., 2020 - 2023)"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
        </div>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none"
        />
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
          </motion.button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ title: "", company: "", period: "", location: "", description: "" });
              }}
              className="px-6 py-3 bg-gray-700 rounded-xl font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Existing Experiences</h3>
        {experiences.map((exp) => (
          <div key={exp._id} className="glass p-6 rounded-2xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-xl font-bold">{exp.title}</h4>
                <p className="text-blue-400">{exp.company}</p>
                <p className="text-gray-400 text-sm">{exp.period} • {exp.location}</p>
                <p className="text-gray-300 mt-2">{exp.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skills Tab
export function SkillsTab() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    level: 80,
    icon: "",
    color: "#3B82F6",
    category: "",
    description: "",
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      if (data.success) setSkills(data.data);
    } catch (err) {
      console.error('Error loading skills:', err);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.icon || !formData.category || !formData.description) {
      alert("Please fill in all required fields (name, icon, category, and description)!");
      return;
    }

    setLoading(true);
    try {
      const url = '/api/skills';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, _id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        alert(editingId ? 'Skill updated! ✅' : 'Skill added! ✅');
        setFormData({ name: "", level: 80, icon: "", color: "#3B82F6", category: "", description: "" });
        setEditingId(null);
        loadSkills();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Error: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
      alert('Skill deleted! ✅');
      loadSkills();
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  const handleEdit = (skill: any) => {
    setEditingId(skill._id);
    setFormData({
      name: skill.name,
      level: skill.level || 80,
      icon: skill.icon,
      color: skill.color || "#3B82F6",
      category: skill.category || "",
      description: skill.description || "",
    });
  };

  const programmingLanguages = [
    // Frontend
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", color: "#61DAFB" },
    { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", category: "Frontend", color: "#4FC08D" },
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", category: "Frontend", color: "#DD0031" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend", color: "#000000" },
    { name: "Svelte", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg", category: "Frontend", color: "#FF3E00" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend", color: "#E34F26" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend", color: "#1572B6" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend", color: "#06B6D4" },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", category: "Frontend", color: "#7952B3" },
    { name: "Material-UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg", category: "Frontend", color: "#007FFF" },
    { name: "Sass/SCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg", category: "Frontend", color: "#CC6699" },
    
    // JavaScript/TypeScript
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Language", color: "#F7DF1E" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Language", color: "#3178C6" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend", color: "#339933" },
    { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "Backend", color: "#000000" },
    { name: "Nest.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg", category: "Backend", color: "#E0234E" },
    
    // Backend Languages
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Language", color: "#3776AB" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Language", color: "#007396" },
    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", category: "Language", color: "#239120" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Language", color: "#00599C" },
    { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", category: "Language", color: "#00ADD8" },
    { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", category: "Language", color: "#000000" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Language", color: "#777BB4" },
    { name: "Ruby", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg", category: "Language", color: "#CC342D" },
    { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", category: "Language", color: "#FA7343" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", category: "Language", color: "#7F52FF" },
    { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", category: "Language", color: "#0175C2" },
    { name: "Scala", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg", category: "Language", color: "#DC322F" },
    { name: "Elixir", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg", category: "Language", color: "#4B275F" },
    
    // Databases
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database", color: "#47A248" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database", color: "#4169E1" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database", color: "#4479A1" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", category: "Database", color: "#DC382D" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Database", color: "#FFCA28" },
    { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", category: "Database", color: "#003B57" },
    { name: "Oracle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", category: "Database", color: "#F80000" },
    { name: "Cassandra", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg", category: "Database", color: "#1287B1" },
    
    // DevOps & Tools
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps", color: "#2496ED" },
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", category: "DevOps", color: "#326CE5" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tools", color: "#F05032" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "Tools", color: "#181717" },
    { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg", category: "Tools", color: "#FC6D26" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "Cloud", color: "#FF9900" },
    { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", category: "Cloud", color: "#0078D4" },
    { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", category: "Cloud", color: "#4285F4" },
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", category: "Cloud", color: "#000000" },
    { name: "Netlify", icon: "https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg", category: "Cloud", color: "#00C7B7" },
    
    // Mobile
    { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Mobile", color: "#61DAFB" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", category: "Mobile", color: "#02569B" },
    { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg", category: "Mobile", color: "#3880FF" },
    
    // Testing
    { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg", category: "Testing", color: "#C21325" },
    { name: "Cypress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg", category: "Testing", color: "#17202C" },
    { name: "Playwright", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg", category: "Testing", color: "#2EAD33" },
    { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg", category: "Testing", color: "#43B02A" },
    
    // Other
    { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", category: "API", color: "#E10098" },
    { name: "Webpack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg", category: "Tools", color: "#8DD6F9" },
    { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", category: "Tools", color: "#646CFF" },
    { name: "Babel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg", category: "Tools", color: "#F9DC3E" },
    { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", category: "State Management", color: "#764ABC" },
    { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", category: "3D/Graphics", color: "#000000" },
    { name: "D3.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg", category: "Visualization", color: "#F9A03C" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Skills Management</h2>
        <div className="glass px-4 py-2 rounded-xl">
          <p className="text-sm text-gray-400">
            <span className="text-blue-400 font-bold">{skills.length}</span> custom skills
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="glass p-6 rounded-2xl space-y-4">
        <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add New'} Skill</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Skill Name *</label>
            <input
              type="text"
              placeholder="e.g., React, Vue.js, Angular"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Category *</label>
            <input
              type="text"
              placeholder="e.g., Frontend, Styling, Tools"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Quick Select Technology (Auto-fills name, icon, category & color)
            </label>
            <select
              onChange={(e) => {
                const selected = programmingLanguages.find(lang => lang.name === e.target.value);
                if (selected) {
                  setFormData({
                    ...formData,
                    name: selected.name,
                    icon: selected.icon,
                    category: selected.category,
                    color: selected.color,
                  });
                }
              }}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
              style={{
                colorScheme: 'dark'
              }}
            >
              <option value="" style={{ backgroundColor: '#1f2937', color: '#fff' }}>-- Select a technology or enter manually below --</option>
              <optgroup label="Frontend" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "Frontend").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="Languages" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "Language").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="Backend" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "Backend").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="Databases" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "Database").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="DevOps" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "DevOps").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cloud" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "Cloud").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="Mobile" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "Mobile").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="Testing" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "Testing").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="Tools" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "Tools").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="State Management" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "State Management").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="API" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => l.category === "API").map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
              <optgroup label="Other" style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                {programmingLanguages.filter(l => !["Frontend", "Language", "Backend", "Database", "DevOps", "Cloud", "Mobile", "Testing", "Tools", "State Management", "API"].includes(l.category)).map(lang => (
                  <option key={lang.name} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#fff' }}>{lang.name}</option>
                ))}
              </optgroup>
            </select>
            <p className="text-xs text-gray-500 mt-1">Or manually enter your own below</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Icon (Emoji) *</label>
            <input
              type="text"
              placeholder="⚛️"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white text-3xl text-center"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Skill Level (0-100)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-blue-400 w-16 text-center">{formData.level}%</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-300">Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-16 h-12 bg-white/5 border-2 border-gray-700 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="flex-1 px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                placeholder="#3B82F6"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Description *</label>
          <textarea
            placeholder="Describe your expertise with this technology..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none"
          />
        </div>

        {/* Preview */}
        <div className="glass p-4 rounded-xl">
          <p className="text-sm font-semibold mb-3 text-gray-400">Preview:</p>
          <div className="flex items-start gap-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 p-3"
              style={{ backgroundColor: formData.color }}
            >
              {formData.icon ? (
                formData.icon.startsWith('http') ? (
                  <img src={formData.icon} alt={formData.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-4xl">{formData.icon}</span>
                )
              ) : (
                <span className="text-4xl">?</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-xl font-bold">{formData.name || "Skill Name"}</p>
              <p className="text-sm text-gray-400 mb-2">{formData.category || "Category"}</p>
              <p className="text-sm text-gray-300">{formData.description || "Description will appear here..."}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Saving...' : editingId ? 'Update Skill' : 'Add Skill'}
          </motion.button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ name: "", level: 80, icon: "", color: "#3B82F6", category: "", description: "" });
              }}
              className="px-6 py-3 bg-gray-700 rounded-xl font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Skills List */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">Your Custom Skills ({skills.length})</h3>
        
        {skills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No custom skills added yet.</p>
            <p className="text-gray-500 mt-2">Add your first skill using the form above!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <motion.div
                key={skill._id}
                whileHover={{ scale: 1.02 }}
                className="glass p-5 rounded-2xl group hover:bg-white/5 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-lg"
                      style={{ backgroundColor: skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{skill.name}</h4>
                      <p className="text-sm text-gray-400">Level: {skill.level}%</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Projects Tab
export function ProjectsTab() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    tags: "",
    github: "",
    demo: "",
    color: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (err) {
      console.error('Error loading projects:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
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
    try {
      const url = '/api/projects';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId 
        ? { ...formData, tags: formData.tags.split(',').map(t => t.trim()), _id: editingId }
        : { ...formData, tags: formData.tags.split(',').map(t => t.trim()) };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        alert(editingId ? 'Updated! ✅' : 'Added! ✅');
        setFormData({ title: "", description: "", longDescription: "", image: "", tags: "", github: "", demo: "", color: "" });
        setImageFile(null);
        setImagePreview("");
        setEditingId(null);
        loadProjects();
      }
    } catch (err) {
      alert('Error: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      loadProjects();
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  const handleEdit = (project: any) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      image: project.image,
      tags: project.tags.join(', '),
      github: project.github,
      demo: project.demo,
      color: project.color,
    });
    setImagePreview(project.image);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Projects Management</h2>

      {/* Form */}
      <div className="glass p-6 rounded-2xl space-y-4">
        <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Project</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="GitHub URL"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Demo URL"
            value={formData.demo}
            onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Color (e.g., #3B82F6)"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
        </div>
        <textarea
          placeholder="Short Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none"
        />
        <textarea
          placeholder="Long Description"
          value={formData.longDescription}
          onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none"
        />
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
          </motion.button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ title: "", description: "", longDescription: "", image: "", tags: "", github: "", demo: "", color: "" });
              }}
              className="px-6 py-3 bg-gray-700 rounded-xl font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="glass p-6 rounded-2xl">
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-4 flex-1">
                {project.image && (
                  <img src={project.image} alt={project.title} className="w-24 h-24 object-cover rounded-lg" />
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-bold">{project.title}</h4>
                  <p className="text-gray-300 text-sm mt-1">{project.description}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {project.tags?.map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Education Tab
export function EducationTab() {
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    period: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const res = await fetch('/api/education');
      const data = await res.json();
      if (data.success) setEducation(data.data);
    } catch (err) {
      console.error('Error loading education:', err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const url = '/api/education';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, _id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        alert(editingId ? 'Updated!' : 'Added!');
        setFormData({ degree: "", institution: "", period: "", location: "", description: "" });
        setEditingId(null);
        loadEducation();
      }
    } catch (err) {
      alert('Error: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education?')) return;
    try {
      await fetch(`/api/education?id=${id}`, { method: 'DELETE' });
      loadEducation();
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  const handleEdit = (edu: any) => {
    setEditingId(edu._id);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      location: edu.location,
      description: edu.description,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Education Management</h2>

      {/* Form */}
      <div className="glass p-6 rounded-2xl space-y-4">
        <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Education</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Degree"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Institution"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Period (e.g., 2016 - 2020)"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
        </div>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white resize-none"
        />
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
          </motion.button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ degree: "", institution: "", period: "", location: "", description: "" });
              }}
              className="px-6 py-3 bg-gray-700 rounded-xl font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Existing Education</h3>
        {education.map((edu) => (
          <div key={edu._id} className="glass p-6 rounded-2xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-xl font-bold">{edu.degree}</h4>
                <p className="text-blue-400">{edu.institution}</p>
                <p className="text-gray-400 text-sm">{edu.period} • {edu.location}</p>
                <p className="text-gray-300 mt-2">{edu.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(edu._id)}
                  className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Contact Tab (uses Profile data)
export function ContactTab() {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold text-gray-400">
        Contact information is managed in the Profile tab
      </h3>
      <p className="text-gray-500 mt-4">
        Go to Profile tab to update email, phone, and location
      </p>
    </div>
  );
}

// Certifications Tab
export function CertificationsTab() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    year: "",
  });

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const res = await fetch('/api/certifications');
      const data = await res.json();
      if (data.success) setCertifications(data.data);
    } catch (err) {
      console.error('Error loading certifications:', err);
    }
  };

  const handleSave = async () => {
    if (!formData.name) {
      alert("Please enter certification name!");
      return;
    }

    setLoading(true);
    try {
      const url = '/api/certifications';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, _id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        alert(editingId ? 'Updated! ✅' : 'Added! ✅');
        setFormData({ name: "", issuer: "", year: "" });
        setEditingId(null);
        loadCertifications();
      }
    } catch (err) {
      alert('Error: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    try {
      await fetch(`/api/certifications?id=${id}`, { method: 'DELETE' });
      alert('Deleted! ✅');
      loadCertifications();
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  const handleEdit = (cert: any) => {
    setEditingId(cert._id);
    setFormData({
      name: cert.name,
      issuer: cert.issuer || "",
      year: cert.year || "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Certifications Management</h2>

      {/* Form */}
      <div className="glass p-6 rounded-2xl space-y-4">
        <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Certification</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-300">Certification Name *</label>
            <input
              type="text"
              placeholder="e.g., AWS Certified Developer"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Year</label>
            <input
              type="text"
              placeholder="2024"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Issuer (Optional)</label>
          <input
            type="text"
            placeholder="e.g., Amazon Web Services"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
          />
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
          </motion.button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ name: "", issuer: "", year: "" });
              }}
              className="px-6 py-3 bg-gray-700 rounded-xl font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Existing Certifications ({certifications.length})</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div key={cert._id} className="glass p-6 rounded-2xl group hover:bg-white/5 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{cert.name}</h4>
                  {cert.issuer && <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>}
                  {cert.year && <p className="text-gray-500 text-sm mt-1">{cert.year}</p>}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(cert._id)}
                    className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Settings Tab
export function SettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const handlePasswordChange = async () => {
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Password changed successfully! ✅\n\nYour new password is now active and saved permanently.\n\nYou'll need to use the new password next time you log in.`);
        
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Error changing password: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = () => {
    if (confirm("Clear all cached data? This will refresh the page.")) {
      // Clear localStorage
      localStorage.clear();
      // Clear sessionStorage
      sessionStorage.clear();
      // Reload page
      window.location.reload();
    }
  };

  const handleExportData = async () => {
    try {
      // Fetch all data
      const [profile, skills, projects, experience, education, certifications] = await Promise.all([
        fetch('/api/profile').then(r => r.json()),
        fetch('/api/skills').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/experience').then(r => r.json()),
        fetch('/api/education').then(r => r.json()),
        fetch('/api/certifications').then(r => r.json()),
      ]);

      const exportData = {
        exportDate: new Date().toISOString(),
        profile: profile.data,
        skills: skills.data,
        projects: projects.data,
        experience: experience.data,
        education: education.data,
        certifications: certifications.data,
      };

      // Create download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      alert("Data exported successfully! ✅");
    } catch (error) {
      alert("Error exporting data: " + error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>

      {/* Password Change */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">Change Admin Password</h3>
        <p className="text-sm text-gray-400 mb-6">
          Current password: <code className="bg-gray-800 px-2 py-1 rounded">admin123</code>
        </p>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Current Password</label>
            <input
              type={showPasswords ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">New Password</label>
            <input
              type={showPasswords ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
              placeholder="Enter new password (min 6 characters)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Confirm New Password</label>
            <input
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showPasswords"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 bg-white/5 text-blue-600"
            />
            <label htmlFor="showPasswords" className="text-sm text-gray-400 cursor-pointer">
              Show passwords
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePasswordChange}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Changing...' : 'Change Password'}
          </motion.button>
        </div>

        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <p className="text-sm text-green-400">
            <strong>✅ Automatic:</strong> Password changes are saved permanently to the database. You don&apos;t need to update any files!
          </p>
        </div>
      </div>

      {/* Data Management */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">Data Management</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportData}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600/20 hover:bg-green-600/30 border-2 border-green-600/50 rounded-xl font-semibold text-green-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export All Data
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClearCache}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-orange-600/20 hover:bg-orange-600/30 border-2 border-orange-600/50 rounded-xl font-semibold text-orange-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Cache
          </motion.button>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Export your data as a JSON backup file or clear cached data to refresh the admin panel.
        </p>
      </div>

      {/* System Info */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">System Information</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Admin Panel Version</span>
            <span className="font-semibold">1.0.0</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Database</span>
            <span className="font-semibold text-green-400">MongoDB Connected</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Contact Form</span>
            <span className="font-semibold text-green-400">Formspree Active</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Last Login</span>
            <span className="font-semibold">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
