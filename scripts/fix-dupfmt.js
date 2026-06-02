const fs = require('fs');
let c = fs.readFileSync('components/Pricing.tsx', 'utf8');

// Remove the old fmt function that uses ETB_RATE
const oldFmt = `  const fmt = (usdAmount: number) => {
    if (currency === "etb") {
      const etb = Math.round(usdAmount * ETB_RATE);
      return \`ETB \${etb.toLocaleString()}\`;
    }
    return \`\${usdAmount.toLocaleString()}\`;
  };`;

c = c.replace(oldFmt, '');
// Clean up any double blank lines
c = c.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync('components/Pricing.tsx', c);
console.log('Done. ETB_RATE remaining:', (c.match(/ETB_RATE/g)||[]).length);
