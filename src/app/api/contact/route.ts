import { NextRequest, NextResponse } from "next/server";

import fs from "fs/promises";

import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const filePath = path.join(
      process.cwd(),
      "data",
      "contacts.json"
    );

    let contacts = [];

    try {
      const file = await fs.readFile(filePath, "utf8");
      contacts = JSON.parse(file);
    } catch {
      contacts = [];
    }

    const newContact = {
      id: Date.now(),

      fullName: body.fullName,

      email: body.email,

      phone: body.phone,

      subject: body.subject,

      message: body.message,

      createdAt: new Date().toISOString(),
    };

    contacts.push(newContact);

    await fs.writeFile(
      filePath,
      JSON.stringify(contacts, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: "Message saved successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save message.",
      },
      {
        status: 500,
      }
    );
  }
}