import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phone, password, name, email } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { message: "Phone and password are required" },
        { status: 400 }
      );
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: {
        phone,
      },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: {
        phone,
        password: hashedPassword,
        name,
        email,
        role: "ADMIN",
      },
    });
    return NextResponse.json(
      { message: "Admin created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in create admin user --> ${err}` },
      { status: 500 }
    );
  }
}
