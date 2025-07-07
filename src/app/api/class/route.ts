import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        subClass: true,
      },
    });

    if (!classes) {
      return NextResponse.json({ error: "No classes found" }, { status: 404 });
    }

    return NextResponse.json(classes);
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in get class --> ${err}` },
      { status: 500 }
    );
  }
}
