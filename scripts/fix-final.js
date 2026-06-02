const fs = require('fs');
let c = fs.readFileSync('components/Pricing.tsx', 'utf8');

// Replace everything from customPrices state to just before useEffect for pricing-config
const startMarker = '  // editable prices loaded from admin API';
const endMarker = '\n\n  useEffect(() => {\n    fetch("/api/pricing-config")';

const startIdx = c.indexOf(startMarker);
const endIdx = c.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.log('markers not found', startIdx, endIdx);
  process.exit(1);
}

const replacement = `  // editable prices loaded from admin API
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

c = c.slice(0, startIdx) + replacement + c.slice(endIdx);

// Also fix the old basePrice/featuresAdd that still use getPrice correctly
// Remove old total/basePrice block and replace with clean version
const oldCalcStart = '\n  const basePrice = projectTypes.find((p) => p.id === projectType)';
const oldCalcEnd = '  const totalETB = Math.round((basePriceETB + pagesAddETB + featuresAddETB) * multiplier);';

const calcStart = c.indexOf(oldCalcStart);
const calcEnd = c.indexOf(oldCalcEnd) + oldCalcEnd.length;

if (calcStart !== -1 && calcEnd !== oldCalcEnd.length - 1) {
  const newCalc = `
  const basePrice = projectTypes.find((p) => p.id === projectType)
    ? getPrice(projectType!, projectTypes.find(p => p.id === projectType)!.base)
    : 0;
  const pagesAdd = pageOptions.find((p) => p.id === pages)?.add ?? 0;
  const featuresAdd = selectedFeatures.reduce((sum, id) => {
    const feat = featuresList.find((f) => f.id === id);
    return sum + (feat ? getPrice(\`feat_\${id}\`, feat.price) : 0);
  }, 0);
  const multiplier = timelines.find((t) => t.id === timeline)?.multiplier ?? 1;
  const total = Math.round((basePrice + pagesAdd + featuresAdd) * multiplier);

  // Both currencies for quote display
  const basePriceUSD = projectTypes.find(p => p.id === projectType)
    ? (customPrices[projectType!]?.usd ?? defaultsUSD[projectType!] ?? projectTypes.find(p => p.id === projectType)!.base) : 0;
  const basePriceETB = projectTypes.find(p => p.id === projectType)
    ? (customPrices[projectType!]?.etb ?? defaultsETB[projectType!] ?? 0) : 0;
  const pagesAddUSD = pageOptions.find(p => p.id === pages)?.add ?? 0;
  const pagesAddETB = Math.round(pagesAddUSD * 57);
  const featuresAddUSD = selectedFeatures.reduce((sum, id) => {
    const feat = featuresList.find(f => f.id === id);
    return sum + (feat ? (customPrices[\`feat_\${id}\`]?.usd ?? feat.price) : 0);
  }, 0);
  const featuresAddETB = selectedFeatures.reduce((sum, id) => {
    const feat = featuresList.find(f => f.id === id);
    return sum + (feat ? (customPrices[\`feat_\${id}\`]?.etb ?? defaultsETB[\`feat_\${id}\`] ?? 0) : 0);
  }, 0);
  const totalUSD = Math.round((basePriceUSD + pagesAddUSD + featuresAddUSD) * multiplier);
  const totalETB = Math.round((basePriceETB + pagesAddETB + featuresAddETB) * multiplier);`;
  c = c.slice(0, calcStart) + newCalc + c.slice(calcEnd);
  console.log('Calc block replaced');
}

fs.writeFileSync('components/Pricing.tsx', c);
console.log('Done');
console.log('getPrice calls:', (c.match(/getPrice\(/g) || []).length);
console.log('defaultsUSD refs:', (c.match(/defaultsUSD/g) || []).length);
