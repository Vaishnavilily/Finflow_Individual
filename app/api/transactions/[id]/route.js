import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/lib/models/Transaction';
import User from '@/lib/models/user';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const txn = await Transaction.findById(id);
    if (!txn) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json(txn);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    const txn = await Transaction.findByIdAndUpdate(id, body, { new: true });
    if (!txn) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(txn);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const txn = await Transaction.findByIdAndDelete(id);
    if (!txn) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Remove reference from user
    await User.updateOne(
      { transactions: id },
      { $pull: { transactions: id } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
