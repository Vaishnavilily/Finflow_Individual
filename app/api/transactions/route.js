import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/lib/models/Transaction';
import User from '@/lib/models/user';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const authId = searchParams.get('authId'); // pass ?authId=... from frontend
    const type = searchParams.get('type');

    const user = await User.findOne({ authId }).populate({
      path: 'transactions',
      match: type && type !== 'all' ? { type } : {},
      options: { sort: { date: -1 }, limit: 100 }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.transactions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { authId, ...txnData } = body;

    const user = await User.findOne({ authId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const transaction = await Transaction.create(txnData);
    user.transactions.push(transaction._id);
    await user.save();

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
