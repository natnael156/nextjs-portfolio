# Migrate Base64 Images to Files

If you have images stored as base64 in your database, here's how to convert them:

## Option 1: Online Converter (Easiest)

1. Copy the base64 string from your database
2. Go to: https://base64.guru/converter/decode/image
3. Paste the base64 string
4. Click "Decode"
5. Download the image
6. Compress it using TinyPNG
7. Save to `public/images/profile/` or `public/images/projects/`
8. Update database with new path

## Option 2: Browser Console (Quick)

1. Open your admin panel
2. Open browser console (F12)
3. Paste this code:

```javascript
// For profile image
async function downloadBase64Image(base64String, filename) {
  const link = document.createElement('a');
  link.href = base64String;
  link.download = filename;
  link.click();
}

// Usage:
// 1. Get base64 from database (copy from admin panel preview)
// 2. Run:
downloadBase64Image('data:image/jpeg;base64,YOUR_BASE64_HERE', 'profile.jpg');
```

## Option 3: Node.js Script

Create a file `convert-base64.js`:

```javascript
const fs = require('fs');

// Your base64 string (without the data:image/jpeg;base64, prefix)
const base64String = 'YOUR_BASE64_STRING_HERE';

// Convert to buffer
const buffer = Buffer.from(base64String, 'base64');

// Save to file
fs.writeFileSync('public/images/profile/profile.jpg', buffer);

console.log('Image saved!');
```

Run: `node convert-base64.js`

## After Conversion

1. Compress the image using TinyPNG
2. Place in appropriate folder
3. Update database with path: `/images/profile/profile.jpg`
4. Delete old base64 data from database (optional, saves space)

## Verify It Works

1. Go to your portfolio
2. Open DevTools Network tab (F12)
3. Refresh page
4. Check image loads from `/images/` path
5. Should be < 200KB and load in < 0.1s
