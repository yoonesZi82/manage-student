import prisma from "@/lib/prisma";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, classId, totalAmount, teacher, day, startTime, endTime } =
      body;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    if (
      !name ||
      !classId ||
      !totalAmount ||
      !teacher ||
      !day ||
      !startTime ||
      !endTime
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 401 }
      );
    }

    const subClass = await prisma.subClass.findUnique({
      where: { id },
    });

    if (!subClass) {
      return NextResponse.json(
        { message: "Sub class not found" },
        { status: 404 }
      );
    }

    await prisma.subClass.update({
      where: { id },
      data: {
        name,
        classId,
        totalAmount,
        teacher,
        day,
        startTime,
        endTime,
      },
    });

    return NextResponse.json({ message: "Sub class updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in update sub class --> ${err}` },
      { status: 500 }
    );
  }
}
