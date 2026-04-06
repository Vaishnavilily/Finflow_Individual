import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Goal from '@/lib/models/Goal';
import User from '@/lib/models/user';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const authId = searchParams.get('authId'); // pass ?authId=... from frontend

    const user = await User.findOne({ authId }).populate('goals');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.goals);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { authId, ...goalData } = body;

    const user = await User.findOne({ authId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const goal = await Goal.create(goalData);
    user.goals.push(goal._id);
    await user.save();

    return NextResponse.json(goal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
