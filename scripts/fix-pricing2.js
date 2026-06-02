const fs = require('fs');
let c = fs.readFileSync('components/Pricing.tsx', 'utf8');

// 1. Change customPrices type
c = c.replace(
  `const [customPrices, setCustomPrices] = useState<Record<string, number>>({});`,
  `const [customPrices, setCustomPrices] = useState<Record<string, { usd: number; etb: number }>>({});`
);

// 2. Remove ETB_RATE and fmt function, replace with manual lookup
c = c.replace(
  `  // currency
  const [currency, setCurrency] = useState<"usd" | "etb">("usd");
  const ETB_RATE = customPrices["etb_rate"] ?? 57; // 1 USD = X ETB, editable in admin

  const fmt = (usdAmount: number) => {
    if (currency === "etb") {
      const etb = Math.round(usdAmount * ETB_RATE);
      return \`ETB \${etb.toLocaleString()}\`;
    }
    return \`$\${usdAmount.toLocaleString()}\`;
  };`,
  `  // currency
  const [currency, setCurrency] = useState<"usd" | "etb">("usd");

  // Default prices if not set in admin
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

  const getPrice = (id: string, fallbackUSD: number): number => {
    const cfg = customPrices[id];
    if (currency === "etb") return cfg?.etb ?? defaultsETB[id] ?? Math.round(fallbackUSD * 57);
    return cfg?.usd ?? fallbackUSD;
  };

  const fmt = (amount: number) =>
    currency === "etb" ? \`ETB \${amount.toLocaleString()}\` : \`$\${amount.toLocaleString()}\`;`
);

// 3. Replace getBase calls with getPrice
c = c.replace(/getBase\(/g, 'getPrice(');

// 4. Remove old getBase function
c = c.replace(
  `  const getBase = (id: string, fallback: number) => customPrices[id] ?? fallback;\n\n`,
  ''
);

// 5. Fix the quote message to show both currencies manually
c = c.replace(
  /Estimated Budget: \$\$\{total\.toLocaleString\(\)\} USD \/ ETB \$\{Math\.round\(total \* ETB_RATE\)\.toLocaleString\(\)\}/,
  'Estimated Budget: $${totalUSD.toLocaleString()} USD / ETB ${totalETB.toLocaleString()}'
);

// 6. Fix the ETB conversion display lines
c = c.replace(
  /currency === "usd" \? `≈ ETB \${Math\.round\(total \* ETB_RATE\)\.toLocaleString\(\)}`/g,
  'currency === "usd" ? `≈ ETB ${totalETB.toLocaleString()}`'
);

fs.writeFileSync('components/Pricing.tsx', c);
console.log('Done');
console.log('getPrice present:', c.includes('getPrice('));
console.log('getBase remaining:', (c.match(/getBase/g) || []).length);
