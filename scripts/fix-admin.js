const fs = require('fs');
let c = fs.readFileSync('app/admin/tabs.tsx', 'utf8');

// Add etb_rate to defaults
c = c.replace(
  /const defaults: Record<string, number> = \{(\s*)landing:/,
  'const defaults: Record<string, number> = {$1etb_rate: 57,$1landing:'
);

// Add etb_rate item to configuratorItems array - insert after first [
c = c.replace(
  /const configuratorItems = \[\n\s*\{ key: "landing"/,
  'const configuratorItems = [\n    { key: "etb_rate", label: "💱 ETB Exchange Rate (1 USD = ? ETB)" },\n    { key: "landing"'
);

fs.writeFileSync('app/admin/tabs.tsx', c);
console.log('Done. etb_rate present:', c.includes('etb_rate'));
