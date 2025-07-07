import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isValidObjectId } from "mongoose";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "sub class id is not valid" },
        { status: 400 }
      );
    }

    const subClass = await prisma.subClass.findUnique({
      where: {
        id: id,
      },
    });

    if (!subClass) {
      return NextResponse.json(
        { message: "sub class not found" },
        { status: 404 }
      );
    }

    await prisma.subClass.delete({
      where: { id },
    });

    return NextResponse.json({ message: "sub class deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in delete sub class --> ${err}` },
      { status: 500 }
    );
  }
}
