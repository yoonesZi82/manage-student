import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isValidObjectId } from "mongoose";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "class id is not valid" },
        { status: 400 }
      );
    }

    const classData = await prisma.class.findUnique({
      where: {
        id: id,
      },
    });

    if (!classData) {
      return NextResponse.json({ message: "class not found" }, { status: 404 });
    }

    await prisma.class.delete({
      where: { id },
    });

    return NextResponse.json({ message: "class deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in delete class --> ${err}` },
      { status: 500 }
    );
  }
}
