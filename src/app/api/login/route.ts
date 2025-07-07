import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json(
        { message: "Phone and password are required" },
        { status: 400 }
      );
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { phone },
    });

    if (!existingAdmin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json("user found it");
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: `Unknown error in login user --> ${err}` },
      { status: 500 }
    );
  }
}
