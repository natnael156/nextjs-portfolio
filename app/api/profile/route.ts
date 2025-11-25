import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Profile from '@/models/Profile';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let profile = await Profile.findOne();
    
    // Create default profile if none exists
    if (!profile) {
      profile = await Profile.create({
        name: 'Your Name',
        title: 'Front-End Developer',
        bio: 'A passionate developer creating amazing web experiences.',
        location: 'San Francisco, CA',
        email: 'hello@example.com',
        phone: '+1 (555) 123-4567',
      });
    }
    
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    let profile = await Profile.findOne();
    
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, body, { new: true });
    } else {
      profile = await Profile.create(body);
    }
    
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
