import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { subClassId, userId } = body;

    if (!subClassId || !userId) {
      return NextResponse.json(
        { message: "classId and userId are required" },
        { status: 400 }
      );
    }

    const findSubClass = await prisma.subClass.findUnique({
      where: { id: subClassId },
    });

    if (!findSubClass) {
      return NextResponse.json(
        { message: "subClass not found" },
        { status: 404 }
      );
    }

    const findUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!findUser) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const findUserSubClass = await prisma.userSubClass.findFirst({
      where: {
        AND: [{ userId }, { subClassId }],
      },
    });

    if (!findUserSubClass) {
      return NextResponse.json(
        { message: "user not found in subClass" },
        { status: 404 }
      );
    }

    await prisma.userSubClass.delete({
      where: {
        id: findUserSubClass.id,
      },
    });

    return NextResponse.json(
      { message: "user deleted from subClass" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in delete user --> ${err}` },
      { status: 500 }
    );
  }
}
