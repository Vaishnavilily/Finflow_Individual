import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/lib/models/Budget';

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find().sort({ createdAt: -1 });
    return NextResponse.json(budgets);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const budget = await Budget.create(body);
    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
