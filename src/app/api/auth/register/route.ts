import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { randomBytes } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { firstName, lastName, email, password } = await req.json();

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Generate unique invite code
    const inviteCode = randomBytes(4).toString('hex');

    // Create new user with 50 free bandwidth
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      inviteCode,
      bandwidth: 0, // Give 50 free bandwidth to new users
    });

    await user.save();

    return NextResponse.json(
      { success: true, message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
