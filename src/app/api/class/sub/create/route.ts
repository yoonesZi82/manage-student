import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { isValidObjectId } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, classId, startTime, endTime, day, teacher, totalAmount } =
      body;

    if (
      !name ||
      !classId ||
      !startTime ||
      !endTime ||
      !day ||
      !teacher ||
      !totalAmount
    ) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    if (!isValidObjectId(classId)) {
      return NextResponse.json({ message: "Invalid classId" }, { status: 401 });
    }

    const findClass = await prisma.class.findUnique({
      where: {
        id: classId,
      },
      include: {
        subClass: true,
      },
    });

    const existingSubClass = await prisma.subClass.findFirst({
      where: {
        AND: [{ name }, { classId: findClass?.id }],
      },
    });

    if (existingSubClass) {
      return NextResponse.json(
        { message: "Sub class already exists" },
        { status: 402 }
      );
    }

    if (findClass?.subClassCount === findClass?.subClass.length) {
      return NextResponse.json(
        { message: "Sub class count is already max" },
        { status: 403 }
      );
    }

    await prisma.subClass.create({
      data: {
        name,
        classId,
        startTime,
        endTime,
        day,
        teacher,
        totalAmount,
      },
    });

    return NextResponse.json(
      { message: "Sub class created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: `Unknown error in create sub class --> ${err}` },
      { status: 500 }
    );
  }
}
