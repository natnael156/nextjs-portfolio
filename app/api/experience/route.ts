import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Experience from '@/models/Experience';

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const experience = await Experience.create(body);
    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...updateData } = body;
    const experience = await Experience.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Experience.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
