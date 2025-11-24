import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Education from '@/models/Education';

export async function GET() {
  try {
    await connectDB();
    const education = await Education.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const education = await Education.create(body);
    return NextResponse.json({ success: true, data: education });
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
    const education = await Education.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, data: education });
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
    await Education.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
