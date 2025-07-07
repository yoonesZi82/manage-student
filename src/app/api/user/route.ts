import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        paidAmounts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in get users --> ${err}` },
      { status: 500 }
    );
  }
}
