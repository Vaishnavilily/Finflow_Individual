import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/lib/models/Transaction';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const filter = type && type !== 'all' ? { type } : {};
    const transactions = await Transaction.find(filter).sort({ date: -1 }).limit(100);
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const transaction = await Transaction.create(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
