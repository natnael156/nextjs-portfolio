import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    if (!['profile', 'projects'].includes(folder)) {
      return NextResponse.json({ success: false, error: 'Invalid folder' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'File must be an image' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File size must be less than 5MB' }, { status: 400 });
    }

    // Convert file to buffer then base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: `portfolio/${folder}`,
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
        ...(folder === 'profile'
          ? [{ width: 600, height: 600, crop: 'fill', gravity: 'face' }]
          : [{ width: 800, height: 600, crop: 'fill' }]),
      ],
    });

    return NextResponse.json({
      success: true,
      path: result.secure_url,
      filename: result.public_id,
      size: result.bytes,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
