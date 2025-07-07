import prisma from "@/lib/prisma";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Id is not valid" }, { status: 401 });
    }

    const existSubClass = await prisma.subClass.findUnique({
      where: {
        id,
      },
      include: {
        paidAmounts: {
          include: {
            user: true,
            subClass: true,
          },
        },
        class: true,
        userSubClasses: {
          include: {
            user: true,
            subClass: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!existSubClass) {
      return NextResponse.json(
        { message: "Sub class is not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(existSubClass);
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in find sub class --> ${err}` },
      { status: 500 }
    );
  }
}
