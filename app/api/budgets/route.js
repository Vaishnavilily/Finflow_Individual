import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/lib/models/Budget';
import User from '@/lib/models/user';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const authId = searchParams.get('authId'); // pass ?authId=... from frontend

    const user = await User.findOne({ authId }).populate('budgets');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.budgets);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { authId, ...budgetData } = body;

    const user = await User.findOne({ authId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const budget = await Budget.create(budgetData);
    user.budgets.push(budget._id);
    await user.save();

    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

