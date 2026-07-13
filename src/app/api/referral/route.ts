import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface ReferralData {
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

    // Data folder
    const dataFolder = path.join(process.cwd(), "data");

    // Create data folder if it doesn't exist
    await fs.mkdir(dataFolder, {
      recursive: true,
    });

    const filePath = path.join(
      dataFolder,
      "referrals.json"
    );

    let referrals: ReferralData[] = [];

    try {
      const file = await fs.readFile(filePath, "utf8");
      referrals = JSON.parse(file);
    } catch {
      // File doesn't exist yet
      referrals = [];
    }

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

    await fs.writeFile(
      filePath,
      JSON.stringify(referrals, null, 2),
      "utf8"
    );

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