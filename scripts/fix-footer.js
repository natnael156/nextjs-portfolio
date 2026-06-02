const fs = require('fs');
let c = fs.readFileSync('components/Pricing.tsx', 'utf8');

// Fix the footer bar price display
const oldFooter = `                  <motion.p key={\`\${total}-\${currency}\`} initial={{ scale: 1.15, color: "#60a5fa" }} animate={{ scale: 1, color: "#ffffff" }} transition={{ duration: 0.3 }} className="text-2xl font-black text-white">
                    {total > 0 ? \`\${total.toLocaleString()}\` : "—"}
                  </motion.p>
                </div>`;

const newFooter = `                  <motion.p key={\`\${totalUSD}-\${totalETB}-\${currency}\`} initial={{ scale: 1.15, color: "#60a5fa" }} animate={{ scale: 1, color: "#ffffff" }} transition={{ duration: 0.3 }} className="text-2xl font-black text-white">
                    {(currency === "usd" ? totalUSD : totalETB) > 0 ? fmt(currency === "usd" ? totalUSD : totalETB) : "—"}
                  </motion.p>
                  {totalUSD > 0 && (
                    <p className="text-xs text-gray-600 mt-0.5">
                      {currency === "usd" ? \`≈ ETB \${totalETB.toLocaleString()}\` : \`≈ $\${totalUSD.toLocaleString()} USD\`}
                    </p>
                  )}
                </div>`;

if (c.includes(oldFooter)) {
  c = c.replace(oldFooter, newFooter);
  console.log('Footer replaced');
} else {
  // Try without exact match - find the line and replace
  c = c.replace(
    /\{total > 0 \? `\$\{total\.toLocaleString\(\)\}` : "—"\}/,
    '{(currency === "usd" ? totalUSD : totalETB) > 0 ? fmt(currency === "usd" ? totalUSD : totalETB) : "—"}'
  );
  console.log('Fallback replacement done');
}

// Also fix the quote message
c = c.replace(
  /Estimated Budget: \$\$\{totalUSD\.toLocaleString\(\)\} USD \/ ETB \$\{totalETB\.toLocaleString\(\)\}/,
  'Estimated Budget: $${totalUSD.toLocaleString()} USD / ETB ${totalETB.toLocaleString()}'
);

fs.writeFileSync('components/Pricing.tsx', c);
console.log('Done');
