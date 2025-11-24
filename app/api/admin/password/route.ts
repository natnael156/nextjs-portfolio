import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdminSettings from '@/models/AdminSettings';

export async function GET() {
  try {
    await connectDB();
    let settings = await AdminSettings.findOne();
    
    // If no settings exist, create default with password from env
    if (!settings) {
      settings = await AdminSettings.create({
        password: process.env.ADMIN_PASSWORD || 'admin123',
      });
    }
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current and new passwords are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Get current settings
    let settings = await AdminSettings.findOne();
    
    if (!settings) {
      // Create with default password
      settings = await AdminSettings.create({
        password: process.env.ADMIN_PASSWORD || 'admin123',
      });
    }

    // Verify current password
    if (settings.password !== currentPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Update password
    settings.password = newPassword;
    settings.updatedAt = new Date();
    await settings.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Password changed successfully',
      data: { updatedAt: settings.updatedAt }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
