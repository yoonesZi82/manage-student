import prisma from "@/lib/prisma";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, subClassCount } = body;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Id is not valid" }, { status: 401 });
    }

    const existClass = await prisma.class.findUnique({
      where: {
        id,
      },
      include: {
        subClass: true,
      },
    });

    if (!existClass) {
      return NextResponse.json(
        { message: "Class is not found" },
        { status: 404 }
      );
    }

    await prisma.class.update({
      where: {
        id,
      },
      data: {
        name,
        subClassCount,
      },
    });
    return NextResponse.json({ message: "Class updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in find class --> ${err}` },
      { status: 500 }
    );
  }
}
