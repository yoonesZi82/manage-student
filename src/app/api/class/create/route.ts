import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, subClassCount } = body;

    if (!name || !subClassCount) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    if (!name.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 401 }
      );
    }

    if (subClassCount < 1 || subClassCount > 6) {
      return NextResponse.json(
        { message: "SubClassCount must be between 1 and 6" },
        { status: 402 }
      );
    }

    const alreadyExist = await prisma.class.findFirst({
      where: {
        name,
      },
    });

    if (alreadyExist) {
      return NextResponse.json(
        { message: "Class already exists" },
        { status: 403 }
      );
    }

    await prisma.class.create({
      data: {
        name,
        subClassCount,
      },
    });
    return NextResponse.json({ message: "Class created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in create class --> ${err}` },
      { status: 500 }
    );
  }
}
