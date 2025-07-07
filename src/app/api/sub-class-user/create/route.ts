import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { subClassId, userIds } = await req.json();

    if (!subClassId || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { message: "subClassId and userIds[] are required." },
        { status: 400 }
      );
    }

    const existingUsers = await prisma.userSubClass.findMany({
      where: {
        subClassId,
        userId: { in: userIds },
      },
    });

    const existingUserIds = new Set(existingUsers.map((u) => u.userId));

    const newUserIds = userIds.filter((id) => !existingUserIds.has(id));

    if (newUserIds.length === 0) {
      return NextResponse.json(
        { message: "All users already exist in this sub-class." },
        { status: 400 }
      );
    }

    // ایجاد همزمان userSubClass و paidAmount برای هر user جدید
    await prisma.$transaction(
      newUserIds.flatMap((userId: string) => [
        prisma.userSubClass.create({
          data: { subClassId, userId },
        }),
        prisma.paidAmount.create({
          data: {
            userId,
            subClassId,
            price: 0,
            status: "INACTIVE",
          },
        }),
      ])
    );

    return NextResponse.json(
      { message: "Users added to sub-class with paidAmount records." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: `Unknown error in create sub class users --> ${err}`,
      },
      { status: 500 }
    );
  }
}
