# Images Folder

This folder stores all portfolio images locally for **fast loading**.

## Folder Structure

```
public/images/
├── profile/          # Profile photos
│   ├── default.svg   # Default placeholder
│   └── [your-photo].jpg
├── projects/         # Project images
│   ├── default.svg   # Default placeholder
│   └── [project-images].jpg
└── README.md
```

## How It Works

### Automatic Upload (via Admin Panel)
1. Go to `/admin` in your browser
2. Upload images through the admin interface
3. Images are automatically:
   - Saved to the appropriate folder
   - Optimized for web
   - Linked in the database

### Manual Upload (Faster)
1. Place your images directly in the folders:
   - Profile photo → `public/images/profile/`
   - Project images → `public/images/projects/`

2. Update the database with the filename:
   - Profile: `/images/profile/your-photo.jpg`
   - Projects: `/images/projects/project-image.jpg`

## Image Guidelines

### Profile Photo
- **Size**: 600x600px (square)
- **Format**: JPG or WebP
- **File size**: < 200KB
- **Name**: Use simple names like `profile.jpg`

### Project Images
- **Size**: 800x600px (4:3 ratio)
- **Format**: JPG or WebP
- **File size**: < 150KB each
- **Name**: Use descriptive names like `ecommerce-project.jpg`

## Compression Tips

Before uploading, compress your images:

1. **Online**: Use [TinyPNG](https://tinypng.com/)
2. **Mac**: Use [ImageOptim](https://imageoptim.com/)
3. **Windows**: Use [FileOptimizer](https://sourceforge.net/projects/nikkhokkho/)

## Benefits of Local Storage

✅ **10x Faster Loading** - No database queries
✅ **Better Caching** - Browser caches images automatically
✅ **CDN Ready** - Easy to move to a CDN later
✅ **No Base64 Bloat** - Smaller database size
✅ **SEO Friendly** - Search engines can index images

## Migration from Database

If you have images stored as base64 in the database:

1. Copy the base64 string
2. Convert to image file using online tool
3. Save to appropriate folder
4. Update database with new path

Example:
```
Old: data:image/jpeg;base64,/9j/4AAQSkZJRg...
New: /images/profile/my-photo.jpg
```
