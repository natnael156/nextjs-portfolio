const fs = require('fs');
let c = fs.readFileSync('components/Pricing.tsx', 'utf8');

// Replace key={total} with key={`${total}-${currency}`} in the motion.p
c = c.replace(
  /key=\{total\} (initial=\{\{ scale: 1\.15)/,
  'key={`${total}-${currency}`} $1'
);

// Replace the total display line
c = c.replace(
  /\{total > 0 \? `\$\{total\.toLocaleString\(\)\}` : "—"\}/,
  '{total > 0 ? fmt(total) : "—"}'
);

fs.writeFileSync('components/Pricing.tsx', c);

// verify
if (c.includes('fmt(total)')) {
  console.log('SUCCESS: fmt(total) found');
} else {
  console.log('FAILED');
}
