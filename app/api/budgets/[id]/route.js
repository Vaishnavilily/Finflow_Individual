import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/lib/models/Budget';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await Budget.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();
    const budget = await Budget.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(budget);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
