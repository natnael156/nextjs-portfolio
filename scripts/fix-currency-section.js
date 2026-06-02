const fs = require('fs');
let c = fs.readFileSync('components/Pricing.tsx', 'utf8');

// Replace the stale ETB_RATE + fmt block with the correct one
const oldBlock = `  // editable prices loaded from admin API
  const [customPrices, setCustomPrices] = useState<Record<string, { usd: number; etb: number }>>({});
  // currency
  const [currency, setCurrency] = useState<"usd" | "etb">("usd");
  const ETB_RATE = customPrices["etb_rate"] ?? 57; // 1 USD = X ETB, editable in admin

  const fmt = (usdAmount: number) => {
    if (currency === "etb") {
      const etb = Math.round(usdAmount * ETB_RATE);
      return \`ETB \${etb.toLocaleString()}\`;
    }
    return \`\${usdAmount.toLocaleString()}\`;
  };`;

const newBlock = `  // editable prices loaded from admin API
  const [customPrices, setCustomPrices] = useState<Record<string, { usd: number; etb: number }>>({});
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
    currency === "etb" ? \`ETB \${amount.toLocaleString()}\` : \`$\${amount.toLocaleString()}\`;`;

if (c.includes(oldBlock)) {
  c = c.replace(oldBlock, newBlock);
  console.log('Block replaced successfully');
} else {
  console.log('Block not found with exact match - using line replacement');
  c = c.replace('  const ETB_RATE = customPrices["etb_rate"] ?? 57; // 1 USD = X ETB, editable in admin', '');
  c = c.replace(
    `  const fmt = (usdAmount: number) => {
    if (currency === "etb") {
      const etb = Math.round(usdAmount * ETB_RATE);
      return \`ETB \${etb.toLocaleString()}\`;
    }
    return \`\${usdAmount.toLocaleString()}\`;
  };`,
    `  const defaultsUSD: Record<string, number> = {
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
    currency === "etb" ? \`ETB \${amount.toLocaleString()}\` : \`$\${amount.toLocaleString()}\`;`
  );
}

fs.writeFileSync('components/Pricing.tsx', c);
console.log('Done. ETB_RATE remaining:', (c.match(/ETB_RATE/g)||[]).length);
console.log('getPrice present:', c.includes('getPrice'));
console.log('defaultsUSD present:', c.includes('defaultsUSD'));
