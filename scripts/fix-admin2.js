const fs = require('fs');
let c = fs.readFileSync('app/admin/tabs.tsx', 'utf8');

// 1. Replace configPrices state type from Record<string,number> to Record<string,{usd:number,etb:number}>
c = c.replace(
  `const [configPrices, setConfigPrices] = useState<Record<string, number>>({});`,
  `const [configPrices, setConfigPrices] = useState<Record<string, { usd: number; etb: number }>>({});`
);

// 2. Replace defaults (remove etb_rate, just keep USD defaults)
c = c.replace(
  /const defaults: Record<string, number> = \{[\s\S]*?\};/,
  `const defaultsUSD: Record<string, number> = {
    landing: 300, portfolio: 400, ecommerce: 1200, webapp: 1500, mobile: 2000, blog: 600,
    feat_auth: 300, feat_db: 400, feat_payment: 350, feat_seo: 200, feat_analytics: 250,
    feat_email: 200, feat_animations: 300, feat_cms: 350, feat_realtime: 400, feat_chat: 250,
  };
  const defaultsETB: Record<string, number> = {
    landing: 17100, portfolio: 22800, ecommerce: 68400, webapp: 85500, mobile: 114000, blog: 34200,
    feat_auth: 17100, feat_db: 22800, feat_payment: 19950, feat_seo: 11400, feat_analytics: 14250,
    feat_email: 11400, feat_animations: 17100, feat_cms: 19950, feat_realtime: 22800, feat_chat: 14250,
  };`
);

// 3. Replace handleConfigSave updates mapper
c = c.replace(
  `      const updates = configuratorItems.map(item => ({
        key: item.key,
        price: configPrices[item.key] ?? defaults[item.key],
        label: item.label,
      }));`,
  `      const updates = configuratorItems.map(item => ({
        key: item.key,
        usd: configPrices[item.key]?.usd ?? defaultsUSD[item.key],
        etb: configPrices[item.key]?.etb ?? defaultsETB[item.key],
        label: item.label,
      }));`
);

// 4. Replace the configurator grid UI
const oldGrid = `        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {configuratorItems.map((item) => (
            <div key={item.key} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-300">{item.label}</p>
                <p className="text-xs text-gray-600">default: ${`defaults[item.key]`}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500 text-sm">$</span>
                <input
                  type="number"
                  value={configPrices[item.key] ?? defaults[item.key]}
                  onChange={(e) => setConfigPrices(prev => ({ ...prev, [item.key]: parseInt(e.target.value) || 0 }))}
                  className="w-24 px-3 py-2 bg-white/5 border border-gray-700 rounded-lg text-white text-sm font-bold focus:outline-none focus:border-blue-500 text-right"
                />
              </div>
            </div>
          ))}
        </div>`;

const newGrid = `        {/* Column headers */}
        <div className="grid grid-cols-3 gap-3 mt-4 px-4 pb-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest col-span-1">Item</p>
          <p className="text-xs font-semibold text-green-500 uppercase tracking-widest text-center">USD ($)</p>
          <p className="text-xs font-semibold text-yellow-500 uppercase tracking-widest text-center">ETB (ብር)</p>
        </div>
        <div className="space-y-2 mt-1">
          {configuratorItems.map((item) => (
            <div key={item.key} className="grid grid-cols-3 gap-3 items-center bg-white/3 border border-white/8 rounded-xl px-4 py-3">
              <p className="text-sm font-medium text-gray-300">{item.label}</p>
              <div className="flex items-center gap-1">
                <span className="text-green-500 text-xs font-bold">$</span>
                <input
                  type="number"
                  value={configPrices[item.key]?.usd ?? defaultsUSD[item.key]}
                  onChange={(e) => setConfigPrices(prev => ({
                    ...prev,
                    [item.key]: { usd: parseInt(e.target.value) || 0, etb: prev[item.key]?.etb ?? defaultsETB[item.key] }
                  }))}
                  className="w-full px-3 py-2 bg-white/5 border border-green-700/50 rounded-lg text-white text-sm font-bold focus:outline-none focus:border-green-500 text-right"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xs font-bold">Br</span>
                <input
                  type="number"
                  value={configPrices[item.key]?.etb ?? defaultsETB[item.key]}
                  onChange={(e) => setConfigPrices(prev => ({
                    ...prev,
                    [item.key]: { usd: prev[item.key]?.usd ?? defaultsUSD[item.key], etb: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 bg-white/5 border border-yellow-700/50 rounded-lg text-white text-sm font-bold focus:outline-none focus:border-yellow-500 text-right"
                />
              </div>
            </div>
          ))}
        </div>`;

if (c.includes('grid md:grid-cols-2 gap-3 mt-4')) {
  // find and replace the grid block
  const startIdx = c.indexOf('        <div className="grid md:grid-cols-2 gap-3 mt-4">');
  const endIdx = c.indexOf('        </div>', startIdx) + '        </div>'.length;
  c = c.slice(0, startIdx) + newGrid + c.slice(endIdx);
  console.log('Grid replaced');
} else {
  console.log('Grid not found');
}

// 5. Remove etb_rate from configuratorItems
c = c.replace(`    { key: "etb_rate", label: "💱 ETB Exchange Rate (1 USD = ? ETB)" },\n`, '');

fs.writeFileSync('app/admin/tabs.tsx', c);
console.log('Done');
