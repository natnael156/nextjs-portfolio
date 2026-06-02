"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronRight } from "lucide-react";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  time: string;
}

// ─── Knowledge Base ───────────────────────────────────────────────
const kb: Record<string, string> = {
  // HTML
  html: "**HTML** (HyperText Markup Language) is the skeleton of every webpage. It uses *tags* like `<h1>`, `<p>`, `<div>`, `<img>` to structure content.\n\n```html\n<h1>Hello World</h1>\n<p>This is a paragraph.</p>\n```\n\nStart with the basics: headings, paragraphs, links, images, forms, and semantic tags like `<header>`, `<main>`, `<footer>`.",

  css: "**CSS** (Cascading Style Sheets) makes your HTML look great. You select elements and apply styles:\n\n```css\nh1 {\n  color: #3b82f6;\n  font-size: 2rem;\n}\n```\n\nKey topics: Box model, Flexbox, Grid, animations, media queries for responsive design. Learn Flexbox and Grid first — they're used everywhere.",

  javascript: "**JavaScript** brings your pages to life. It's the only programming language that runs natively in the browser.\n\n```js\nconst btn = document.querySelector('button');\nbtn.addEventListener('click', () => {\n  alert('You clicked me!');\n});\n```\n\nLearn: variables, functions, arrays, objects, DOM manipulation, fetch API, and async/await.",

  react: "**React** is a JavaScript library for building UIs with reusable *components*.\n\n```jsx\nfunction Button({ label }) {\n  return <button className=\"btn\">{label}</button>;\n}\n```\n\nCore concepts: JSX, props, state (`useState`), effects (`useEffect`), and component composition. React is the most in-demand frontend skill right now.",

  nextjs: "**Next.js** is a React framework that adds routing, server-side rendering, API routes, and much more.\n\n✅ File-based routing — create `app/about/page.tsx` and it becomes `/about`\n✅ Server Components for fast page loads\n✅ Built-in image optimization\n✅ API routes in `app/api/`\n\nIt's what this portfolio is built with!",

  typescript: "**TypeScript** is JavaScript with types. It catches bugs before you run your code.\n\n```ts\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n```\n\nStart by typing function params and return values. Gradually add interfaces and generics. TypeScript is now expected in most professional React/Next.js projects.",

  tailwind: "**Tailwind CSS** is a utility-first CSS framework. Instead of writing CSS files, you apply classes directly in HTML:\n\n```html\n<button class=\"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700\">\n  Click me\n</button>\n```\n\nIt's fast to write, easy to customize, and keeps your styles co-located with your markup. Most modern Next.js projects use it.",

  nodejs: "**Node.js** lets you run JavaScript on the server. It's used for building APIs, backends, and CLI tools.\n\n```js\nconst http = require('http');\nhttp.createServer((req, res) => {\n  res.end('Hello from Node!');\n}).listen(3000);\n```\n\nPair it with **Express.js** for a simple REST API, or use Next.js API routes to avoid managing a separate server.",

  api: "An **API** (Application Programming Interface) lets your frontend talk to a backend or third-party service.\n\n```js\n// Fetching data from an API\nconst res = await fetch('https://api.example.com/posts');\nconst data = await res.json();\nconsole.log(data);\n```\n\nLearn: REST vs GraphQL, HTTP methods (GET, POST, PUT, DELETE), status codes, and how to use `fetch` or `axios`.",

  git: "**Git** is version control — it tracks changes to your code and lets you collaborate with others.\n\n```bash\ngit init          # start a repo\ngit add .         # stage changes\ngit commit -m \"fix: button color\"  # save a snapshot\ngit push origin main  # send to GitHub\n```\n\nLearn the basics: commit, branch, merge, pull request. Use **GitHub** to host your projects.",

  mongodb: "**MongoDB** is a NoSQL database that stores data as JSON-like documents.\n\n```js\n// Insert a document\nawait db.collection('users').insertOne({\n  name: 'Natnael',\n  role: 'developer'\n});\n```\n\nGreat for flexible data structures. Use **Mongoose** with Node.js for schema validation. For a free hosted DB, use **MongoDB Atlas**.",

  flexbox: "**Flexbox** is a CSS layout system perfect for 1D layouts (rows or columns).\n\n```css\n.container {\n  display: flex;\n  justify-content: center;  /* horizontal */\n  align-items: center;      /* vertical */\n  gap: 1rem;\n}\n```\n\nKey properties: `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `gap`. Use it for navbars, cards, and centering elements.",

  grid: "**CSS Grid** is for 2D layouts — rows AND columns at the same time.\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n```\n\nPerfect for page layouts, card grids, and dashboards. Learn `grid-template-columns`, `grid-template-rows`, `gap`, and `grid-area`.",

  responsive: "**Responsive design** makes your site look great on all screen sizes.\n\n```css\n/* Mobile first */\n.card { width: 100%; }\n\n/* Tablet+ */\n@media (min-width: 768px) {\n  .card { width: 50%; }\n}\n\n/* Desktop+ */\n@media (min-width: 1024px) {\n  .card { width: 33%; }\n}\n```\n\nAlways design mobile-first. In Tailwind: `md:w-1/2 lg:w-1/3`.",

  async: "**Async/Await** makes asynchronous JavaScript readable and clean.\n\n```js\nasync function getUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    const user = await res.json();\n    return user;\n  } catch (err) {\n    console.error('Error:', err);\n  }\n}\n```\n\nUnder the hood it uses Promises. Always wrap in try/catch to handle errors.",

  useState: "**useState** is React's hook for local component state.\n\n```jsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}\n```\n\nThe first value is the state, the second is the setter. Never mutate state directly — always use the setter.",

  useEffect: "**useEffect** runs side effects in React components — fetching data, subscriptions, DOM manipulation.\n\n```jsx\nuseEffect(() => {\n  fetch('/api/data')\n    .then(r => r.json())\n    .then(setData);\n}, []); // [] = run once on mount\n```\n\nThe dependency array `[]` controls when it re-runs. Add variables to it if your effect depends on them.",

  roadmap: "Here's a **Web Dev Learning Roadmap** 🗺️\n\n**Phase 1 — Foundations**\n→ HTML → CSS → JavaScript\n\n**Phase 2 — Frontend**\n→ React → TypeScript → Tailwind CSS\n\n**Phase 3 — Full Stack**\n→ Next.js → Node.js → REST APIs → MongoDB\n\n**Phase 4 — Professional**\n→ Git/GitHub → Testing → Deployment (Vercel) → Performance\n\nFocus on one thing at a time. Build projects at each phase!",

  deploy: "**Deploying** your site means putting it on the internet.\n\n🚀 **Vercel** — Best for Next.js. Connect your GitHub repo and it auto-deploys on every push. Free tier is very generous.\n\n🌐 **Netlify** — Great for static sites and React apps.\n\n☁️ **Railway / Render** — For Node.js backends with databases.\n\nFor this portfolio: push to GitHub → Vercel picks it up automatically.",

  performance: "**Web Performance** matters for user experience and SEO.\n\n✅ Use `next/image` for automatic image optimization\n✅ Lazy load components with `dynamic(() => import(...))`\n✅ Minimize JavaScript bundle size\n✅ Use `loading='lazy'` on images below the fold\n✅ Aim for 90+ on Google Lighthouse\n\nIn Next.js, Server Components reduce JS sent to the browser significantly.",

  seo: "**SEO** (Search Engine Optimization) helps your site rank on Google.\n\n```tsx\nexport const metadata = {\n  title: 'My Portfolio',\n  description: 'Front-end developer...',\n  openGraph: { title: 'My Portfolio' }\n};\n```\n\nIn Next.js, use the `metadata` export in `layout.tsx` or `page.tsx`. Key basics: semantic HTML, meta tags, fast load times, mobile-friendly design.",

  hooks: "**React Hooks** let you use state and other React features in function components.\n\nMost common:\n- `useState` — local state\n- `useEffect` — side effects\n- `useRef` — DOM refs & mutable values\n- `useContext` — global state\n- `useMemo` / `useCallback` — performance optimization\n\nRule: only call hooks at the top level of a component, never inside loops or conditions.",

  prisma: "**Prisma** is a modern ORM for TypeScript/Node.js. It makes database queries type-safe.\n\n```ts\nconst user = await prisma.user.findUnique({\n  where: { id: 1 }\n});\n```\n\nWorks with PostgreSQL, MySQL, SQLite, MongoDB. You define your schema in `schema.prisma` and Prisma generates typed query methods. Great alternative to Mongoose.",

  hello: "Hey there! 👋 I'm your **Web Dev Tutor Bot**.\n\nI can teach you about:\n`html` `css` `javascript` `react` `nextjs` `typescript` `tailwind` `nodejs` `api` `git` `mongodb` `flexbox` `grid` `responsive` `async` `useState` `useEffect` `hooks` `performance` `seo` `deploy` `prisma` `roadmap`\n\nJust type any topic and I'll explain it with examples!",
};

const suggestions = ["roadmap", "html", "react", "nextjs", "typescript", "tailwind", "git", "deploy"];

function getResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // direct keyword matches
  for (const key of Object.keys(kb)) {
    if (q.includes(key)) return kb[key];
  }

  // fuzzy / phrase matches
  if (q.match(/how.*(start|begin|learn)/)) return kb.roadmap;
  if (q.match(/what is (a |an )?api/)) return kb.api;
  if (q.match(/what is (a |an )?hook/)) return kb.hooks;
  if (q.match(/use.?state/)) return kb.useState;
  if (q.match(/use.?effect/)) return kb.useEffect;
  if (q.match(/flex/)) return kb.flexbox;
  if (q.match(/async|await|promise/)) return kb.async;
  if (q.match(/deploy|vercel|netlify|host/)) return kb.deploy;
  if (q.match(/speed|fast|performance|lighthouse/)) return kb.performance;
  if (q.match(/search.*(engine|rank)|seo/)) return kb.seo;
  if (q.match(/hi|hello|hey|start|help/)) return kb.hello;

  return `I don't have a lesson on *"${input}"* yet, but here's what I can teach:\n\n${suggestions.map(s => `• \`${s}\``).join("\n")}\n\nOr ask things like *"how do I start learning web dev?"*`;
}

function formatMessage(text: string) {
  // Convert markdown-ish text to JSX-safe HTML string
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Code block start/end
    if (line.startsWith("```")) return null;
    // Inline code
    line = line.replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-blue-300 text-xs font-mono">$1</code>');
    // Bold
    line = line.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    // Italic
    line = line.replace(/\*([^*]+)\*/g, '<em class="text-gray-300 italic">$1</em>');
    // Arrow bullets
    if (line.startsWith("→")) line = `<span class="text-blue-400">→</span>${line.slice(1)}`;
    // Checkmarks
    if (line.startsWith("✅")) line = `<span>${line}</span>`;

    return (
      <span key={i} className="block" dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }} />
    );
  });
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: kb.hello,
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text?: string) => {
    const q = (text || input).trim();
    if (!q) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: q, time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const answer = getResponse(q);
      const botMsg: Message = { id: Date.now() + 1, role: "bot", text: answer, time: now() };
      setMessages((m) => [...m, botMsg]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white"
        aria-label="Open web dev tutor chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
              <MessageCircle size={22} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
            style={{
              background: "rgba(15, 23, 42, 0.97)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              height: "520px",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex-shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">WebDev Tutor</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <Sparkles size={10} /> Online · Ready to teach
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    msg.role === "bot"
                      ? "bg-gradient-to-br from-blue-500 to-purple-600"
                      : "bg-white/10 border border-white/15"
                  }`}>
                    {msg.role === "bot" ? <Bot size={14} className="text-white" /> : <User size={14} className="text-gray-300" />}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-sm"
                          : "bg-white/6 border border-white/8 text-gray-200 rounded-tl-sm"
                      }`}
                    >
                      {formatMessage(msg.text)}
                    </div>
                    <span className="text-xs text-gray-600 px-1">{msg.time}</span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-center"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="px-4 py-3 bg-white/6 border border-white/8 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0 scrollbar-none">
              {suggestions.slice(0, 5).map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/8 rounded-full text-xs text-gray-400 hover:text-white transition-all"
                >
                  <ChevronRight size={10} />
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 flex-shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 focus-within:border-blue-500/50 transition-colors"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about HTML, React, CSS..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center disabled:opacity-30 flex-shrink-0 transition-opacity"
                >
                  <Send size={14} className="text-white" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
