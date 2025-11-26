// Client-side image upload utilities

export async function uploadImageToPublic(
  file: File,
  folder: 'profile' | 'projects'
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      return data.path; // Returns path like "/images/profile/filename.jpg"
    } else {
      throw new Error(data.error || 'Upload failed');
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

export function getImagePath(imagePath: string | undefined, type: 'profile' | 'project'): string {
  if (!imagePath) {
    return type === 'profile' 
      ? '/images/profile/default.svg' 
      : '/images/projects/default.svg';
  }
  
  // If it's already a full path, return it
  if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's just a filename, construct the path
  return `/images/${type === 'profile' ? 'profile' : 'projects'}/${imagePath}`;
}

export function compressImage(file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
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
        
        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }
            
            // Create new file from blob
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
