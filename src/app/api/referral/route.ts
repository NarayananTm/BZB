import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";

export interface ReferralData {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  referralCode: string;
  message: string;
  createdAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      city,
      referralCode,
      message,
    } = body;

    // Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !city ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const referrals = await readCollection<ReferralData[]>("referral_submissions", []);
    const newReferral: ReferralData = {
      id: Date.now(),
      fullName,
      email,
      phone,
      city,
      referralCode: referralCode || "",
      message,
      createdAt: new Date().toISOString(),
    };

    referrals.push(newReferral);

    await writeCollection("referral_submissions", referrals);

    return NextResponse.json({
      success: true,
      message: "Referral submitted successfully.",
      referral: newReferral,
    });
  } catch (error) {
    console.error("Referral API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}