import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { authenticated } from "@/lib/auth";

export async function POST(req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    // Authenticate and check for admin
    const userData = await authenticated(req, true);
    if (!userData.id) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { amount } = await req.json();

    // Validate input
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Add bandwidth to user
    user.bandwidth += amount;

    // Add transaction record
    user.transactions.push({
      type: 'purchase',
      amount,
      date: new Date(),
    });

    await user.save();

    return NextResponse.json({
      success: true,
      message: `Added ${amount} bandwidth to user`,
      newBandwidth: user.bandwidth
    });
  } catch (error: any) {
    console.error("Error adding bandwidth:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
