import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        paidAmounts: {
          include: {
            subClass: true,
            user: true,
          },
        },
        userSubClasses: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in find user --> ${err}` },
      { status: 500 }
    );
  }
}
