import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Goal from '@/lib/models/Goal';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Goal.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const goal = await Goal.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(goal);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
