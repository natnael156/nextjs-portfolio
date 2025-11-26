# Image Optimization Guide

## Problem
High-resolution images are slowing down your portfolio loading time.

## Solutions Applied

### 1. **Lazy Loading** ✅
- All images now use `loading="lazy"` attribute
- Images load only when they're about to enter the viewport
- Reduces initial page load time significantly

### 2. **Image Optimization for External URLs** ✅
- Unsplash images automatically optimized with WebP format
- Quality reduced to 75% (imperceptible quality loss)
- Width constraints applied (800px for projects)

### 3. **Deferred Non-Critical Resources** ✅
- 3D Scene loads only after profile data is ready
- Particles and floating elements load after initial render
- Prioritizes content over decorative elements

### 4. **Preconnect Hints** ✅
- DNS prefetch for external image domains
- Faster connection to CDNs

### 5. **Dimension Hints** ✅
- Width and height attributes prevent layout shift
- Browser reserves space before image loads

## How to Compress Your Images

### Option 1: Online Tools (Easiest)
1. **TinyPNG** (https://tinypng.com/)
   - Upload your images
   - Download compressed versions
   - Supports PNG and JPEG
   - Free for up to 20 images at once

2. **Squoosh** (https://squoosh.app/)
   - Google's image compression tool
   - More control over quality settings
   - Supports WebP conversion
   - Recommended settings:
     - Format: WebP or JPEG
     - Quality: 75-80%
     - Resize: Max width 1200px for profile, 800px for projects

### Option 2: Bulk Compression (For Multiple Images)
1. **ImageOptim** (Mac) - https://imageoptim.com/
2. **FileOptimizer** (Windows) - https://sourceforge.net/projects/nikkhokkho/

### Option 3: Command Line (Advanced)
```bash
# Install ImageMagick
# Then compress images:
magick convert input.jpg -quality 75 -resize 800x output.jpg
```

## Recommended Image Sizes

| Image Type | Max Width | Max Height | Format | Quality |
|------------|-----------|------------|--------|---------|
| Profile Photo | 600px | 600px | WebP/JPEG | 80% |
| Project Images | 800px | 600px | WebP/JPEG | 75% |
| Skill Icons | 128px | 128px | PNG/SVG | 100% |

## Quick Wins

1. **Replace high-res images in `/public` folder**
   - Compress `resume.pdf` if it's large
   - Optimize any images in public folder

2. **Use WebP format when possible**
   - 25-35% smaller than JPEG
   - Supported by all modern browsers

3. **Consider using a CDN**
   - Upload images to Cloudinary (free tier)
   - Automatic optimization and resizing
   - Example: `https://res.cloudinary.com/your-cloud/image/upload/w_800,q_75/your-image.jpg`

## Testing Performance

After optimizing images, test your site:
1. Open Chrome DevTools (F12)
2. Go to "Network" tab
3. Reload page
4. Check "Size" column - images should be < 200KB each
5. Use Lighthouse (in DevTools) for overall score

## Expected Results

- **Before**: 2-5 seconds initial load
- **After**: 0.5-1.5 seconds initial load
- **Image size reduction**: 60-80% smaller files
- **Lighthouse Performance Score**: 90+ (from ~60-70)

## Need Help?

If images are still slow:
1. Check image file sizes in Network tab
2. Ensure images are < 200KB each
3. Consider using a CDN like Cloudinary or Imgix
4. Use WebP format for all photos
