"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Sparkles, Zap, Crown, ArrowRight, Star } from "lucide-react";

interface PricingPlan {
  _id?: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge: string;
  buttonText: string;
  order: number;
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$499",
    period: "project",
    description: "Perfect for small businesses and personal projects that need a clean, modern web presence.",
    features: [
      "1–3 page responsive website",
      "Mobile-first design",
      "Contact form integration",
      "Basic SEO setup",
      "7-day delivery",
      "1 revision round",
    ],
    highlighted: false,
    badge: "",
    buttonText: "Get Started",
    order: 0,
  },
  {
    name: "Professional",
    price: "$1,200",
    period: "project",
    description: "Ideal for growing businesses that need a powerful, fully featured web application.",
    features: [
      "Up to 8 pages / screens",
      "Custom animations & interactions",
      "CMS or admin dashboard",
      "API & database integration",
      "Performance optimized (90+ Lighthouse)",
      "SEO + Open Graph setup",
      "14-day delivery",
      "3 revision rounds",
    ],
    highlighted: true,
    badge: "Most Popular",
    buttonText: "Start Project",
    order: 1,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "project",
    description: "Full-scale web platforms and long-term partnerships for companies with complex needs.",
    features: [
      "Unlimited pages & complexity",
      "Full-stack architecture",
      "Custom design system",
      "Advanced integrations & APIs",
      "Auth, payments, real-time features",
      "Dedicated support & maintenance",
      "Priority delivery",
      "Unlimited revisions",
    ],
    highlighted: false,
    badge: "Best Value",
    buttonText: "Let's Talk",
    order: 2,
  },
];

const planIcons = [Zap, Crown, Star];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setPlans(data.data);
        } else {
          setPlans(defaultPlans);
        }
        setLoading(false);
      })
      .catch(() => {
        setPlans(defaultPlans);
        setLoading(false);
      });
  }, []);

  const displayPlans = loading ? defaultPlans : plans;

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
          >
            <Sparkles size={14} />
            Transparent Pricing
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Invest in Your{" "}
            <span className="gradient-text">Digital Future</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Clear, honest pricing with no hidden fees. Every project is built with the same passion for quality and performance.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch pt-6">
          {displayPlans.map((plan, index) => {
            const Icon = planIcons[index % planIcons.length];
            const isHighlighted = plan.highlighted;

            return (
              <motion.div
                key={plan._id || plan.name}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onHoverStart={() => setHoveredPlan(index)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative flex flex-col rounded-3xl transition-all duration-500 ${
                  isHighlighted
                    ? "ring-2 ring-blue-500/60 shadow-2xl shadow-blue-500/20 -mt-4"
                    : "ring-1 ring-white/8"
                } ${hoveredPlan === index ? "scale-[1.02] -translate-y-2" : ""}`}
                style={{
                  background: isHighlighted
                    ? "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)"
                    : "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Badge — sits INSIDE the card at the top center */}
                {plan.badge && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg ${
                        isHighlighted
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/40"
                          : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/40"
                      }`}
                    >
                      ✦ {plan.badge} ✦
                    </motion.div>
                  </div>
                )}

                {/* Highlighted top glow bar */}
                {isHighlighted && (
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl" />
                )}

                <div className={`p-8 flex flex-col flex-1 ${plan.badge ? "pt-10" : ""}`}>
                  {/* Icon + Plan name */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isHighlighted
                          ? "bg-gradient-to-br from-blue-500 to-purple-600"
                          : "bg-white/8 border border-white/10"
                      }`}
                    >
                      <Icon size={22} className={isHighlighted ? "text-white" : "text-gray-300"} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <p className="text-gray-500 text-xs uppercase tracking-widest">Plan</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end gap-2">
                      <span
                        className={`text-5xl font-black ${
                          isHighlighted ? "gradient-text" : "text-white"
                        }`}
                      >
                        {plan.price}
                      </span>
                      {plan.price !== "Custom" && (
                        <span className="text-gray-500 mb-2 text-sm">/ {plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 border-b border-white/5 pb-8">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-10 flex-1">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isHighlighted
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-white/5 text-gray-400"
                          }`}
                        >
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 group ${
                      isHighlighted
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-sm mt-12"
        >
          All projects include source code, deployment, and 30 days of post-launch support.
          <a href="#contact" className="text-blue-400 hover:text-blue-300 ml-1 transition-colors">
            Have questions? Let&apos;s talk.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
