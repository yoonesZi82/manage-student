import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, fatherName, birthDate, gender, address, city } = body;

    if (
      !name ||
      !phone ||
      !fatherName ||
      !birthDate ||
      !gender ||
      !address ||
      !city
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ phone }, { name }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 401 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        fatherName,
        birthDate,
        gender,
        address,
        city,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in create user --> ${err}` },
      { status: 500 }
    );
  }
}
