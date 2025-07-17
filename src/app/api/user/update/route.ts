import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      classId,
      userId,
      name,
      phone,
      fatherName,
      birthDate,
      gender,
      address,
      city,
      paidAmount,
    } = body;

    if (
      !classId ||
      !userId ||
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

    const findSubClass = await prisma.subClass.findUnique({
      where: {
        id: classId,
      },
      include: {
        paidAmounts: true,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        paidAmounts: {
          include: {
            subClass: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!findSubClass) {
      return NextResponse.json(
        { message: "Sub class not found" },
        { status: 406 }
      );
    }

    if (paidAmount > findSubClass.totalAmount) {
      return NextResponse.json(
        { message: "Paid amount is not larger than total amount" },
        { status: 402 }
      );
    }

    const findPaidAmount = await prisma.paidAmount.findFirst({
      where: {
        AND: [{ subClassId: findSubClass.id }, { userId: user.id }],
      },
    });

    if (paidAmount && !findPaidAmount) {
      await prisma.paidAmount.create({
        data: {
          subClassId: findSubClass.id,
          userId: user.id,
          price: paidAmount,
          status: paidAmount < findSubClass.totalAmount ? "PENDING" : "ACTIVE",
        },
      });
    } else if (paidAmount && findPaidAmount) {
      await prisma.paidAmount.update({
        where: { id: findPaidAmount.id },
        data: {
          price: paidAmount,
          status: paidAmount < findSubClass.totalAmount ? "PENDING" : "ACTIVE",
        },
      });
    }

    const existingUserWithSameCode = await prisma.user.findFirst({
      where: {
        OR: [{ phone }],
        NOT: { id: user.id },
      },
    });

    if (existingUserWithSameCode) {
      return NextResponse.json(
        { message: "user with this national code already exists" },
        { status: 409 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
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
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in update user --> ${err}` },
      { status: 500 }
    );
  }
}
