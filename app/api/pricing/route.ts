import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Pricing from '@/models/Pricing';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const plans = await Pricing.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: plans });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const plan = await Pricing.create(body);
    return NextResponse.json({ success: true, data: plan });
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
    const plan = await Pricing.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, data: plan });
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
    await Pricing.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
