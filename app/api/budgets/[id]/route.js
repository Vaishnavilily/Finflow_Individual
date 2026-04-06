import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/lib/models/Budget';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const authId = searchParams.get('authId');

    if (!authId) {
      return NextResponse.json({ error: 'Missing authId' }, { status: 400 });
    }

    await Budget.findOneAndDelete({ _id: id, ownerAuthId: authId });
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
    const { authId, ...updates } = body;

    if (!authId) {
      return NextResponse.json({ error: 'Missing authId' }, { status: 400 });
    }

    const budget = await Budget.findOneAndUpdate(
      { _id: id, ownerAuthId: authId },
      updates,
      { new: true }
    );
    return NextResponse.json(budget);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
