import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

const PricingConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  label: { type: String, default: '' },
});

const PricingConfig = mongoose.models.PricingConfig || mongoose.model('PricingConfig', PricingConfigSchema);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const configs = await PricingConfig.find();
    const data: Record<string, number> = {};
    configs.forEach((c: any) => { data[c.key] = c.price; });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    // body: { key: string, price: number }[]
    const updates = Array.isArray(body) ? body : [body];
    for (const item of updates) {
      await PricingConfig.findOneAndUpdate(
        { key: item.key },
        { key: item.key, price: item.price, label: item.label || '' },
        { upsert: true, new: true }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
