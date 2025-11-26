// Image optimization utilities

export function getOptimizedImageUrl(url: string, width?: number, quality?: number): string {
  if (!url) return url;
  
  // If it's a base64 image, return as is (already uploaded)
  if (url.startsWith('data:image')) {
    return url;
  }
  
  // If it's an Unsplash image, add optimization parameters
  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    params.append('q', (quality || 75).toString());
    params.append('fm', 'webp'); // Use WebP format for better compression
    params.append('auto', 'format'); // Auto format selection
    
    return `${url}${separator}${params.toString()}`;
  }
  
  // For other URLs, return as is
  return url;
}

export function compressBase64Image(
  base64: string,
  maxWidth: number = 800,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to compressed base64
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = base64;
  });
}
