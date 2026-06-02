"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Sparkles, Check, ArrowRight, Globe, ShoppingCart, LayoutDashboard,
  Smartphone, Database, Zap, Shield, Search, RefreshCw, Palette,
  MessageSquare, BarChart, Mail, ChevronRight, Calculator,
} from "lucide-react";

// ─── Config Data ──────────────────────────────────────────────────

const projectTypes = [
  { id: "landing", label: "Landing Page", icon: Globe, base: 300, desc: "Single page to showcase a product or service" },
  { id: "portfolio", label: "Portfolio", icon: Palette, base: 400, desc: "Personal or agency portfolio site" },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingCart, base: 1200, desc: "Online store with products & checkout" },
  { id: "webapp", label: "Web App", icon: LayoutDashboard, base: 1500, desc: "Full dashboard or SaaS application" },
  { id: "mobile", label: "Mobile App", icon: Smartphone, base: 2000, desc: "React Native cross-platform app" },
  { id: "blog", label: "Blog / CMS", icon: MessageSquare, base: 600, desc: "Content site with admin management" },
];

const pageOptions = [
  { id: "1-3", label: "1 – 3 pages", add: 0 },
  { id: "4-8", label: "4 – 8 pages", add: 300 },
  { id: "9-15", label: "9 – 15 pages", add: 700 },
  { id: "15+", label: "15+ pages", add: 1200 },
];

const features = [
  { id: "auth", label: "User Auth / Login", icon: Shield, price: 300 },
  { id: "db", label: "Database & API", icon: Database, price: 400 },
  { id: "payment", label: "Payment Integration", icon: ShoppingCart, price: 350 },
  { id: "seo", label: "SEO Optimization", icon: Search, price: 200 },
  { id: "analytics", label: "Analytics Dashboard", icon: BarChart, price: 250 },
  { id: "email", label: "Email Automation", icon: Mail, price: 200 },
  { id: "animations", label: "Custom Animations", icon: Zap, price: 300 },
  { id: "cms", label: "Admin / CMS Panel", icon: LayoutDashboard, price: 350 },
  { id: "realtime", label: "Real-time Features", icon: RefreshCw, price: 400 },
  { id: "chat", label: "Live Chat / Support", icon: MessageSquare, price: 250 },
];

const timelines = [
  { id: "rush", label: "Rush (< 1 week)", multiplier: 1.5, badge: "⚡ Fast" },
  { id: "standard", label: "Standard (2–3 weeks)", multiplier: 1, badge: null },
  { id: "relaxed", label: "Relaxed (1–2 months)", multiplier: 0.85, badge: "💰 Best Value" },
];

// ─── Component ────────────────────────────────────────────────────

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [projectType, setProjectType] = useState<string | null>(null);
  const [pages, setPages] = useState<string>("1-3");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("standard");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // ── Price calculation ─────────────────────────────────────────
  const basePrice = projectTypes.find((p) => p.id === projectType)?.base ?? 0;
  const pagesAdd = pageOptions.find((p) => p.id === pages)?.add ?? 0;
  const featuresAdd = selectedFeatures.reduce((sum, id) => {
    return sum + (features.find((f) => f.id === id)?.price ?? 0);
  }, 0);
  const multiplier = timelines.find((t) => t.id === timeline)?.multiplier ?? 1;
  const total = Math.round((basePrice + pagesAdd + featuresAdd) * multiplier);

  const canNext =
    (step === 1 && projectType !== null) ||
    (step === 2) ||
    (step === 3) ||
    (step === 4);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectLabel = projectTypes.find((p) => p.id === projectType)?.label;
    const featureLabels = selectedFeatures.map((id) => features.find((f) => f.id === id)?.label).join(", ");
    const timelineLabel = timelines.find((t) => t.id === timeline)?.label;

    const message = `Project Quote Request:\n\nProject Type: ${projectLabel}\nPages: ${pages}\nFeatures: ${featureLabels || "None"}\nTimeline: ${timelineLabel}\nEstimated Budget: $${total.toLocaleString()}\n\nNote: ${note}`;

    try {
      await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "movzdlrb"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  const steps = ["Project Type", "Pages & Features", "Timeline", "Get Quote"];

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/4 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Calculator size={14} />
            Interactive Price Builder
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Build Your <span className="gradient-text">Perfect Project</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Tap what you need and get an instant estimate. No surprises, no hidden fees.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Step Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => i + 1 < step && setStep(i + 1)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    step === i + 1
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                      : step > i + 1
                      ? "bg-green-500/20 text-green-400 cursor-pointer hover:bg-green-500/30"
                      : "bg-white/5 text-gray-500"
                  }`}
                >
                  {step > i + 1 ? <Check size={10} /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{s}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-6 h-px ${step > i + 1 ? "bg-green-500/50" : "bg-white/10"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="glass rounded-3xl overflow-hidden border border-white/8">
            <AnimatePresence mode="wait">

              {/* ── Step 1: Project Type ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="p-8"
                >
                  <h3 className="text-2xl font-bold mb-2">What are you building?</h3>
                  <p className="text-gray-400 text-sm mb-8">Select the type of project you need</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {projectTypes.map((pt) => {
                      const Icon = pt.icon;
                      const selected = projectType === pt.id;
                      return (
                        <motion.button
                          key={pt.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setProjectType(pt.id)}
                          className={`relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 text-left transition-all ${
                            selected
                              ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                              : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"
                          }`}
                        >
                          {selected && (
                            <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check size={11} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected ? "bg-blue-500/20" : "bg-white/8"}`}>
                            <Icon size={20} className={selected ? "text-blue-400" : "text-gray-400"} />
                          </div>
                          <div>
                            <p className={`font-semibold text-sm ${selected ? "text-white" : "text-gray-300"}`}>{pt.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{pt.desc}</p>
                          </div>
                          <p className={`text-xs font-bold ${selected ? "text-blue-400" : "text-gray-500"}`}>
                            from ${pt.base.toLocaleString()}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Pages + Features ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="p-8"
                >
                  <h3 className="text-2xl font-bold mb-2">Pages & Features</h3>
                  <p className="text-gray-400 text-sm mb-8">How many pages and what extra features do you need?</p>

                  {/* Pages */}
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-gray-300 mb-3">Number of Pages</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {pageOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setPages(opt.id)}
                          className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                            pages === opt.id
                              ? "border-blue-500 bg-blue-500/10 text-blue-300"
                              : "border-white/8 bg-white/3 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          {opt.label}
                          {opt.add > 0 && <span className="block text-xs text-gray-500 mt-0.5">+${opt.add}</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-sm font-semibold text-gray-300 mb-3">
                      Extra Features <span className="text-gray-600 font-normal">(tap to add)</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {features.map((feat) => {
                        const Icon = feat.icon;
                        const on = selectedFeatures.includes(feat.id);
                        return (
                          <motion.button
                            key={feat.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => toggleFeature(feat.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                              on
                                ? "border-purple-500 bg-purple-500/10"
                                : "border-white/8 bg-white/3 hover:border-white/20"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${on ? "bg-purple-500/20" : "bg-white/8"}`}>
                              <Icon size={16} className={on ? "text-purple-400" : "text-gray-500"} />
                            </div>
                            <span className={`text-sm font-medium flex-1 ${on ? "text-white" : "text-gray-400"}`}>{feat.label}</span>
                            <span className={`text-xs font-bold flex-shrink-0 ${on ? "text-purple-400" : "text-gray-600"}`}>+${feat.price}</span>
                            {on && (
                              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check size={10} className="text-white" strokeWidth={3} />
                              </div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Timeline ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="p-8"
                >
                  <h3 className="text-2xl font-bold mb-2">How fast do you need it?</h3>
                  <p className="text-gray-400 text-sm mb-8">Timeline affects the final price</p>
                  <div className="space-y-4">
                    {timelines.map((t) => (
                      <motion.button
                        key={t.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setTimeline(t.id)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                          timeline === t.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/8 bg-white/3 hover:border-white/20"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          timeline === t.id ? "border-blue-500 bg-blue-500" : "border-gray-600"
                        }`}>
                          {timeline === t.id && <Check size={10} className="text-white" strokeWidth={3} />}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${timeline === t.id ? "text-white" : "text-gray-300"}`}>{t.label}</p>
                        </div>
                        {t.badge && (
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            t.id === "rush" ? "bg-orange-500/20 text-orange-400" : "bg-green-500/20 text-green-400"
                          }`}>{t.badge}</span>
                        )}
                        <span className={`text-sm font-bold ${
                          t.multiplier > 1 ? "text-orange-400" :
                          t.multiplier < 1 ? "text-green-400" : "text-gray-400"
                        }`}>
                          {t.multiplier > 1 ? `+${Math.round((t.multiplier - 1) * 100)}%` :
                           t.multiplier < 1 ? `-${Math.round((1 - t.multiplier) * 100)}%` : "Base price"}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Step 4: Quote & Contact ── */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="p-8"
                >
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} className="text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">Quote Sent!</h3>
                      <p className="text-gray-400">I'll get back to you within 24 hours with a detailed proposal.</p>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-2">Your Custom Quote</h3>
                      <p className="text-gray-400 text-sm mb-6">Here's your estimate. Fill in your details to send it.</p>

                      {/* Summary */}
                      <div className="glass rounded-2xl p-5 mb-6 border border-white/8 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Project Type</span>
                          <span className="text-white font-medium">{projectTypes.find(p => p.id === projectType)?.label}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Pages</span>
                          <span className="text-white font-medium">{pageOptions.find(p => p.id === pages)?.label}</span>
                        </div>
                        {selectedFeatures.length > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Features</span>
                            <span className="text-white font-medium text-right max-w-[60%]">
                              {selectedFeatures.map(id => features.find(f => f.id === id)?.label).join(", ")}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Timeline</span>
                          <span className="text-white font-medium">{timelines.find(t => t.id === timeline)?.label}</span>
                        </div>
                        <div className="border-t border-white/8 pt-3 flex justify-between">
                          <span className="font-bold text-white">Estimated Total</span>
                          <span className="text-2xl font-black gradient-text">${total.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Contact form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Your Name *</label>
                            <input
                              required
                              value={name}
                              onChange={e => setName(e.target.value)}
                              placeholder="Natnael Tefera"
                              className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email *</label>
                            <input
                              required
                              type="email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Anything else to add?</label>
                          <textarea
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            placeholder="Describe your vision, brand, deadline, or any specific requirements..."
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder-gray-600"
                          />
                        </div>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow flex items-center justify-center gap-2 group"
                        >
                          Send My Quote Request
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </form>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer: Live price + nav buttons */}
            {step < 4 && (
              <div className="border-t border-white/8 px-8 py-5 flex items-center justify-between bg-white/2">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Estimated Price</p>
                  <motion.p
                    key={total}
                    initial={{ scale: 1.15, color: "#60a5fa" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-black text-white"
                  >
                    {total > 0 ? `$${total.toLocaleString()}` : "—"}
                  </motion.p>
                </div>
                <div className="flex gap-3">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      Back
                    </button>
                  )}
                  <motion.button
                    whileHover={{ scale: canNext ? 1.03 : 1 }}
                    whileTap={{ scale: canNext ? 0.97 : 1 }}
                    onClick={() => canNext && setStep(step + 1)}
                    disabled={!canNext || (step === 1 && !projectType)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-opacity shadow-lg shadow-blue-500/20"
                  >
                    {step === 3 ? "Get My Quote" : "Next"}
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            )}
          </div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center text-gray-600 text-xs mt-8"
          >
            All projects include source code, deployment & 30 days post-launch support · No commitment required
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
