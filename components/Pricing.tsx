"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Check, ArrowRight, Globe, ShoppingCart, LayoutDashboard,
  Smartphone, Database, Zap, Shield, Search, RefreshCw, Palette,
  MessageSquare, BarChart, Mail, ChevronRight, Languages, DollarSign,
} from "lucide-react";

// ─── Translations ─────────────────────────────────────────────────
const t = {
  en: {
    badge: "Build Your Project",
    title: "Build Your",
    titleGradient: "Perfect Project",
    subtitle: "Tap what you need and get an instant estimate. No surprises, no hidden fees.",
    steps: ["Project Type", "Pages & Features", "Timeline", "Get Quote"],
    step1Title: "What are you building?",
    step1Sub: "Select the type of project you need",
    step2Title: "Pages & Features",
    step2Sub: "How many pages and what extra features do you need?",
    pagesLabel: "Number of Pages",
    featuresLabel: "Extra Features",
    featuresTap: "(tap to add)",
    step3Title: "How fast do you need it?",
    step3Sub: "Timeline affects the final price",
    step4Title: "Your Custom Quote",
    step4Sub: "Here's your estimate. Fill in your details to send it.",
    projectType: "Project Type",
    pages: "Pages",
    features: "Features",
    timeline: "Timeline",
    estimatedTotal: "Estimated Total",
    namePlaceholder: "Your Name *",
    emailPlaceholder: "Email *",
    notePlaceholder: "Describe your vision, brand, deadline, or any specific requirements...",
    noteLabel: "Anything else to add?",
    sendBtn: "Send My Quote Request",
    successTitle: "Quote Sent!",
    successSub: "I'll get back to you within 24 hours with a detailed proposal.",
    estimatedPrice: "Estimated Price",
    back: "Back",
    next: "Next",
    getQuote: "Get My Quote",
    trustLine: "All projects include source code, deployment & 30 days post-launch support · No commitment required",
    from: "from",
    rush: "+50%",
    relaxed: "-15%",
    basePrice: "Base price",
  },
  am: {
    badge: "ፕሮጀክትዎን ይስሩ",
    title: "የመረጡትን",
    titleGradient: "ፕሮጀክትዎን ይስሩ",
    subtitle: "የሚፈልጉትን ይምረጡ እና የፈጣን ዋጋ ግምት ያግኙ። ምንም ድብቅ ክፍያ የለም።",
    steps: ["የፕሮጀክት አይነት", "ገጾች እና ባህሪያት", "የጊዜ ሰሌዳ", "ዋጋ ያግኙ"],
    step1Title: "ምን ማሰራት ይፈልጋሉ?",
    step1Sub: "የሚፈልጉትን የፕሮጀክት አይነት ይምረጡ",
    step2Title: "ገጾች እና ተጨማሪ ባህሪያት",
    step2Sub: "ስንት ገጾች እና ምን ተጨማሪ ባህሪያት ይፈልጋሉ?",
    pagesLabel: "የገጾች ብዛት",
    featuresLabel: "ተጨማሪ ባህሪያት",
    featuresTap: "(ለመጨመር ይጫኑ)",
    step3Title: "ምን ያህል ፈጥኖ ይፈልጋሉ?",
    step3Sub: "የጊዜ ሰሌዳ በመጨረሻ ዋጋ ላይ ተጽዕኖ ያሳድራል",
    step4Title: "የእርስዎ ብጁ ዋጋ",
    step4Sub: "ይህ ግምትዎ ነው። ለመላክ ዝርዝሮችዎን ይሙሉ።",
    projectType: "የፕሮጀክት አይነት",
    pages: "ገጾች",
    features: "ባህሪያት",
    timeline: "የጊዜ ሰሌዳ",
    estimatedTotal: "የተቀመጠ ድምር",
    namePlaceholder: "ስምዎ *",
    emailPlaceholder: "ኢሜይል *",
    notePlaceholder: "ራዕይዎን, ብራንድዎን, የጊዜ ገደብ ወይም ሌሎች መስፈርቶችን ይግለጹ...",
    noteLabel: "ሌላ ነገር ለመጨመር?",
    sendBtn: "የዋጋ ጥያቄዬን ላክ",
    successTitle: "ዋጋ ተልኳል!",
    successSub: "ዝርዝር ሀሳብ ይዤ በ24 ሰዓት ውስጥ እመለሳለሁ።",
    estimatedPrice: "የተቀመጠ ዋጋ",
    back: "ተመለስ",
    next: "ቀጣይ",
    getQuote: "ዋጋዬን አግኝ",
    trustLine: "ሁሉም ፕሮጀክቶች ምንጭ ኮድ፣ ዴፕሎይመንት እና 30 ቀን የድህረ-ልቀት ድጋፍ ያካትታሉ",
    from: "ከ",
    rush: "+50%",
    relaxed: "-15%",
    basePrice: "መሰረታዊ ዋጋ",
  },
};

// ─── Config Data ──────────────────────────────────────────────────
const projectTypes = [
  { id: "landing",   labelEn: "Landing Page",  labelAm: "ማስታወቂያ ገጽ",    icon: Globe,          base: 300,  descEn: "Single page to showcase a product or service",      descAm: "ምርት ወይም አገልግሎት ለማሳየት አንድ ገጽ" },
  { id: "portfolio", labelEn: "Portfolio",     labelAm: "ፖርትፎሊዮ",        icon: Palette,        base: 400,  descEn: "Personal or agency portfolio site",                 descAm: "የግል ወይም የኤጀንሲ ፖርትፎሊዮ" },
  { id: "ecommerce", labelEn: "E-Commerce",    labelAm: "ኢ-ኮሜርስ",         icon: ShoppingCart,   base: 1200, descEn: "Online store with products & checkout",             descAm: "ምርቶች እና ክፍያ ያለው የኦንላይን መደብር" },
  { id: "webapp",    labelEn: "Web App",       labelAm: "ዌብ አፕ",          icon: LayoutDashboard,base: 1500, descEn: "Full dashboard or SaaS application",                descAm: "ሙሉ ዳሽቦርድ ወይም SaaS መተግበሪያ" },
  { id: "mobile",    labelEn: "Mobile App",    labelAm: "ሞባይል አፕ",        icon: Smartphone,     base: 2000, descEn: "flutter cross-platform app for android only",                  descAm: "React Native ብዙ መድረክ መተግበሪያ" },
  { id: "blog",      labelEn: "Blog / CMS",    labelAm: "ብሎግ / CMS",      icon: MessageSquare,  base: 600,  descEn: "Content site with admin management",               descAm: "የይዘት ጣቢያ ከአስተዳዳሪ ጋር" },
];

const pageOptions = [
  { id: "1-3",  labelEn: "1 – 3 pages",   labelAm: "1 – 3 ገጾች",   add: 0 },
  { id: "4-8",  labelEn: "4 – 8 pages",   labelAm: "4 – 8 ገጾች",   add: 300 },
  { id: "9-15", labelEn: "9 – 15 pages",  labelAm: "9 – 15 ገጾች",  add: 700 },
  { id: "15+",  labelEn: "15+ pages",     labelAm: "15+ ገጾች",     add: 1200 },
];

const featuresList = [
  { id: "auth",      labelEn: "User Auth / Login",      labelAm: "የተጠቃሚ ሎጊን",         icon: Shield,         price: 300 },
  { id: "db",        labelEn: "Database & API",          labelAm: "ዳታቤዝ እና API",        icon: Database,       price: 400 },
  { id: "payment",   labelEn: "Payment Integration",     labelAm: "የክፍያ ውህደት",         icon: ShoppingCart,   price: 350 },
  { id: "seo",       labelEn: "SEO Optimization",        labelAm: "SEO ማሻሻያ",           icon: Search,         price: 200 },
  { id: "analytics", labelEn: "Analytics Dashboard",     labelAm: "የትንታኔ ዳሽቦርድ",       icon: BarChart,       price: 250 },
  { id: "email",     labelEn: "Email Automation",        labelAm: "የኢሜይል አውቶሜሽን",      icon: Mail,           price: 200 },
  { id: "animations",labelEn: "Custom Animations",       labelAm: "ብጁ አኒሜሽን",          icon: Zap,            price: 300 },
  { id: "cms",       labelEn: "Admin / CMS Panel",       labelAm: "አስተዳዳሪ ፓናል",        icon: LayoutDashboard,price: 350 },
  { id: "realtime",  labelEn: "Real-time Features",      labelAm: "እውነተኛ ጊዜ ባህሪያት",    icon: RefreshCw,      price: 400 },
  { id: "chat",      labelEn: "Live Chat / Support",     labelAm: "የቀጥታ ውይይት",         icon: MessageSquare,  price: 250 },
];

const timelines = [
  { id: "rush",     labelEn: "Rush (< 3 Day)",          labelAm: "ፈጣን (< 3 ቀን)",       multiplier: 1.5,  badge: "⚡ Fast" },
  { id: "standard", labelEn: "Standard (1–2 weeks)",     labelAm: "መደበኛ (1–2 ሳምንታት)",    multiplier: 1,    badge: null },
  { id: "relaxed",  labelEn: "Relaxed (3–4 weeks)",     labelAm: "ዘና ያለ (3–4 ሳምንታት)",     multiplier: 0.85, badge: "💰 Best Value" },
];

// ─── Editable config stored in state (admin can override via API in future) ─
// For now editable prices come from these defaults which admin can modify

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [lang, setLang] = useState<"en" | "am">("en");
  const tr = t[lang];

  const [projectType, setProjectType] = useState<string | null>(null);
  const [pages, setPages] = useState<string>("1-3");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("standard");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  // editable prices loaded from admin API
  const [customPrices, setCustomPrices] = useState<Record<string, { usd: number; etb: number }>>({});
  // currency
  const [currency, setCurrency] = useState<"usd" | "etb">("usd");

  const defaultsUSD: Record<string, number> = {
    landing: 300, portfolio: 400, ecommerce: 1200, webapp: 1500, mobile: 2000, blog: 600,
    feat_auth: 300, feat_db: 400, feat_payment: 350, feat_seo: 200, feat_analytics: 250,
    feat_email: 200, feat_animations: 300, feat_cms: 350, feat_realtime: 400, feat_chat: 250,
  };
  const defaultsETB: Record<string, number> = {
    landing: 17100, portfolio: 22800, ecommerce: 68400, webapp: 85500, mobile: 114000, blog: 34200,
    feat_auth: 17100, feat_db: 22800, feat_payment: 19950, feat_seo: 11400, feat_analytics: 14250,
    feat_email: 11400, feat_animations: 17100, feat_cms: 19950, feat_realtime: 22800, feat_chat: 14250,
  };
  const getPrice = (id: string, fallback: number): number => {
    const cfg = customPrices[id];
    if (currency === "etb") return cfg?.etb ?? defaultsETB[id] ?? Math.round(fallback * 57);
    return cfg?.usd ?? fallback;
  };
  const fmt = (amount: number) =>
    currency === "etb" ? `ETB ${amount.toLocaleString()}` : `$${amount.toLocaleString()}`;



  useEffect(() => {
    fetch("/api/pricing-config")
      .then(r => r.json())
      .then(d => { if (d.success) setCustomPrices(d.data); })
      .catch(() => {});
  }, []);


  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const basePrice = projectTypes.find((p) => p.id === projectType)
    ? getPrice(projectType!, projectTypes.find(p => p.id === projectType)!.base)
    : 0;
  const pagesAdd = pageOptions.find((p) => p.id === pages)?.add ?? 0;
  const featuresAdd = selectedFeatures.reduce((sum, id) => {
    const feat = featuresList.find((f) => f.id === id);
    return sum + (feat ? getPrice(`feat_${id}`, feat.price) : 0);
  }, 0);
  const multiplier = timelines.find((t) => t.id === timeline)?.multiplier ?? 1;
  const total = Math.round((basePrice + pagesAdd + featuresAdd) * multiplier);

  // Compute both currencies for the quote summary
  const basePriceUSD = projectTypes.find(p => p.id === projectType)
    ? (customPrices[projectType!]?.usd ?? defaultsUSD[projectType!] ?? projectTypes.find(p => p.id === projectType)!.base) : 0;
  const basePriceETB = projectTypes.find(p => p.id === projectType)
    ? (customPrices[projectType!]?.etb ?? defaultsETB[projectType!] ?? 0) : 0;
  const pagesAddUSD = pageOptions.find(p => p.id === pages)?.add ?? 0;
  const pagesAddETB = Math.round(pagesAddUSD * 57);
  const featuresAddUSD = selectedFeatures.reduce((sum, id) => {
    const feat = featuresList.find(f => f.id === id);
    return sum + (feat ? (customPrices[`feat_${id}`]?.usd ?? feat.price) : 0);
  }, 0);
  const featuresAddETB = selectedFeatures.reduce((sum, id) => {
    const feat = featuresList.find(f => f.id === id);
    return sum + (feat ? (customPrices[`feat_${id}`]?.etb ?? defaultsETB[`feat_${id}`] ?? 0) : 0);
  }, 0);
  const totalUSD = Math.round((basePriceUSD + pagesAddUSD + featuresAddUSD) * multiplier);
  const totalETB = Math.round((basePriceETB + pagesAddETB + featuresAddETB) * multiplier);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ptLabel = lang === "en"
      ? projectTypes.find(p => p.id === projectType)?.labelEn
      : projectTypes.find(p => p.id === projectType)?.labelAm;
    const featLabels = selectedFeatures.map(id => {
      const f = featuresList.find(f => f.id === id);
      return lang === "en" ? f?.labelEn : f?.labelAm;
    }).join(", ");
    const tlLabel = lang === "en"
      ? timelines.find(t => t.id === timeline)?.labelEn
      : timelines.find(t => t.id === timeline)?.labelAm;

    const message = `Project Quote Request:\n\nProject Type: ${ptLabel}\nPages: ${pages}\nFeatures: ${featLabels || "None"}\nTimeline: ${tlLabel}\nEstimated Budget: ${totalUSD.toLocaleString()} USD / ETB ${totalETB.toLocaleString()}\n\nNote: ${note}`;
    try {
      await fetch(`https://formspree.io/f/movzdlrb`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
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
          {/* Language + Currency toggles */}
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {/* Language */}
            <div className="inline-flex items-center gap-1 p-1 glass rounded-full border border-white/10">
              <button
                onClick={() => setLang("en")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${lang === "en" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                <Languages size={13} /> EN
              </button>
              <button
                onClick={() => setLang("am")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${lang === "am" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                <span className="text-xs">አማ</span> አማርኛ
              </button>
            </div>
            {/* Currency */}
            <div className="inline-flex items-center gap-1 p-1 glass rounded-full border border-white/10">
              <button
                onClick={() => setCurrency("usd")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${currency === "usd" ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                <DollarSign size={13} /> USD
              </button>
              <button
                onClick={() => setCurrency("etb")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${currency === "etb" ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                <span className="text-xs font-bold">Br</span> ETB
              </button>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            {tr.title} <span className="gradient-text">{tr.titleGradient}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">{tr.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Step Progress */}
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {tr.steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => i + 1 < step && setStep(i + 1)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    step === i + 1 ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                    : step > i + 1 ? "bg-green-500/20 text-green-400 cursor-pointer hover:bg-green-500/30"
                    : "bg-white/5 text-gray-500"}`}
                >
                  {step > i + 1 ? <Check size={10} /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{s}</span>
                </button>
                {i < tr.steps.length - 1 && (
                  <div className={`w-6 h-px ${step > i + 1 ? "bg-green-500/50" : "bg-white/10"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="glass rounded-3xl overflow-hidden border border-white/8">
            <AnimatePresence mode="wait">

              {/* Step 1 */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-8">
                  <h3 className="text-2xl font-bold mb-1">{tr.step1Title}</h3>
                  <p className="text-gray-400 text-sm mb-8">{tr.step1Sub}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {projectTypes.map((pt) => {
                      const Icon = pt.icon;
                      const sel = projectType === pt.id;
                      const price = getPrice(pt.id, pt.base);
                      return (
                        <motion.button key={pt.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => setProjectType(pt.id)}
                          className={`relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 text-left transition-all ${sel ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10" : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"}`}>
                          {sel && <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"><Check size={11} className="text-white" strokeWidth={3} /></div>}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sel ? "bg-blue-500/20" : "bg-white/8"}`}>
                            <Icon size={20} className={sel ? "text-blue-400" : "text-gray-400"} />
                          </div>
                          <div>
                            <p className={`font-semibold text-sm ${sel ? "text-white" : "text-gray-300"}`}>{lang === "en" ? pt.labelEn : pt.labelAm}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{lang === "en" ? pt.descEn : pt.descAm}</p>
                          </div>
                          <p className={`text-xs font-bold ${sel ? "text-blue-400" : "text-gray-500"}`}>{tr.from} {fmt(price)}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-8">
                  <h3 className="text-2xl font-bold mb-1">{tr.step2Title}</h3>
                  <p className="text-gray-400 text-sm mb-8">{tr.step2Sub}</p>
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-gray-300 mb-3">{tr.pagesLabel}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {pageOptions.map((opt) => (
                        <button key={opt.id} onClick={() => setPages(opt.id)}
                          className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${pages === opt.id ? "border-blue-500 bg-blue-500/10 text-blue-300" : "border-white/8 bg-white/3 text-gray-400 hover:border-white/20"}`}>
                          {lang === "en" ? opt.labelEn : opt.labelAm}
                          {opt.add > 0 && <span className="block text-xs text-gray-500 mt-0.5">+${opt.add}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-300 mb-3">{tr.featuresLabel} <span className="text-gray-600 font-normal">{tr.featuresTap}</span></p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {featuresList.map((feat) => {
                        const Icon = feat.icon;
                        const on = selectedFeatures.includes(feat.id);
                        const price = getPrice(`feat_${feat.id}`, feat.price);
                        return (
                          <motion.button key={feat.id} whileTap={{ scale: 0.97 }} onClick={() => toggleFeature(feat.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${on ? "border-purple-500 bg-purple-500/10" : "border-white/8 bg-white/3 hover:border-white/20"}`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${on ? "bg-purple-500/20" : "bg-white/8"}`}>
                              <Icon size={16} className={on ? "text-purple-400" : "text-gray-500"} />
                            </div>
                            <span className={`text-sm font-medium flex-1 ${on ? "text-white" : "text-gray-400"}`}>{lang === "en" ? feat.labelEn : feat.labelAm}</span>
                            <span className={`text-xs font-bold flex-shrink-0 ${on ? "text-purple-400" : "text-gray-600"}`}>+{fmt(price)}</span>
                            {on && <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0"><Check size={10} className="text-white" strokeWidth={3} /></div>}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-8">
                  <h3 className="text-2xl font-bold mb-1">{tr.step3Title}</h3>
                  <p className="text-gray-400 text-sm mb-8">{tr.step3Sub}</p>
                  <div className="space-y-4">
                    {timelines.map((tl) => (
                      <motion.button key={tl.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setTimeline(tl.id)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${timeline === tl.id ? "border-blue-500 bg-blue-500/10" : "border-white/8 bg-white/3 hover:border-white/20"}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${timeline === tl.id ? "border-blue-500 bg-blue-500" : "border-gray-600"}`}>
                          {timeline === tl.id && <Check size={10} className="text-white" strokeWidth={3} />}
                        </div>
                        <p className={`font-semibold flex-1 ${timeline === tl.id ? "text-white" : "text-gray-300"}`}>{lang === "en" ? tl.labelEn : tl.labelAm}</p>
                        {tl.badge && (
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${tl.id === "rush" ? "bg-orange-500/20 text-orange-400" : "bg-green-500/20 text-green-400"}`}>{tl.badge}</span>
                        )}
                        <span className={`text-sm font-bold ${tl.multiplier > 1 ? "text-orange-400" : tl.multiplier < 1 ? "text-green-400" : "text-gray-400"}`}>
                          {tl.multiplier > 1 ? tr.rush : tl.multiplier < 1 ? tr.relaxed : tr.basePrice}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-8">
                  {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-green-400" /></div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{tr.successTitle}</h3>
                      <p className="text-gray-400">{tr.successSub}</p>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-1">{tr.step4Title}</h3>
                      <p className="text-gray-400 text-sm mb-6">{tr.step4Sub}</p>
                      <div className="glass rounded-2xl p-5 mb-6 border border-white/8 space-y-3">
                        <div className="flex justify-between text-sm"><span className="text-gray-400">{tr.projectType}</span><span className="text-white font-medium">{lang === "en" ? projectTypes.find(p => p.id === projectType)?.labelEn : projectTypes.find(p => p.id === projectType)?.labelAm}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-400">{tr.pages}</span><span className="text-white font-medium">{lang === "en" ? pageOptions.find(p => p.id === pages)?.labelEn : pageOptions.find(p => p.id === pages)?.labelAm}</span></div>
                        {selectedFeatures.length > 0 && (
                          <div className="flex justify-between text-sm gap-4"><span className="text-gray-400 flex-shrink-0">{tr.features}</span><span className="text-white font-medium text-right">{selectedFeatures.map(id => { const f = featuresList.find(f => f.id === id); return lang === "en" ? f?.labelEn : f?.labelAm; }).join(", ")}</span></div>
                        )}
                        <div className="flex justify-between text-sm"><span className="text-gray-400">{tr.timeline}</span><span className="text-white font-medium">{lang === "en" ? timelines.find(tl => tl.id === timeline)?.labelEn : timelines.find(tl => tl.id === timeline)?.labelAm}</span></div>
                        <div className="border-t border-white/8 pt-3 flex justify-between items-center">
                          <span className="font-bold text-white">{tr.estimatedTotal}</span>
                          <div className="text-right">
                            <span className="text-2xl font-black gradient-text">{fmt(currency === "usd" ? totalUSD : totalETB)}</span>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {currency === "usd"
                                ? `≈ ETB ${totalETB.toLocaleString()}`
                                : `≈ $${totalUSD.toLocaleString()} USD`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input required value={name} onChange={e => setName(e.target.value)} placeholder={tr.namePlaceholder}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600" />
                          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={tr.emailPlaceholder}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1.5">{tr.noteLabel}</label>
                          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder={tr.notePlaceholder} rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder-gray-600" />
                        </div>
                        <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group">
                          {tr.sendBtn}
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </form>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer bar */}
            {step < 4 && (
              <div className="border-t border-white/8 px-8 py-5 flex items-center justify-between bg-white/2">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">{tr.estimatedPrice}</p>
                  <motion.p key={`${total}-${currency}`} initial={{ scale: 1.15, color: "#60a5fa" }} animate={{ scale: 1, color: "#ffffff" }} transition={{ duration: 0.3 }} className="text-2xl font-black text-white">
                    {total > 0 ? `$${total.toLocaleString()}` : "—"}
                  </motion.p>
                </div>
                <div className="flex gap-3">
                  {step > 1 && (
                    <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all">{tr.back}</button>
                  )}
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => step < 4 && (step !== 1 || projectType) && setStep(step + 1)}
                    disabled={step === 1 && !projectType}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold disabled:opacity-40 shadow-lg shadow-blue-500/20">
                    {step === 3 ? tr.getQuote : tr.next}
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            )}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
            className="text-center text-gray-600 text-xs mt-8">{tr.trustLine}</motion.p>
        </motion.div>
      </div>
    </section>
  );
}
