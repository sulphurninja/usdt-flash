import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { authenticated } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Authenticate and check for admin
    const userData = await authenticated(req, true);
    if (!userData.id) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Get all users, excluding passwords
    const users = await User.find({}).select('-password');

    // Format user data for response
    const formattedUsers = users.map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      bandwidth: user.bandwidth,
      walletAddress: user.walletAddress,
      inviteCode: user.inviteCode,
      createdAt: user.createdAt
    }));

    return NextResponse.json({
      success: true,
      users: formattedUsers
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
