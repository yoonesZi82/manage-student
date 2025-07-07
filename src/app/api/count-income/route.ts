import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const countIncome = await prisma.paidAmount.count({
      where: {
        status: {
          in: ["ACTIVE", "PENDING"],
        },
      },
    });

    if (!countIncome) {
      return NextResponse.json({ message: "No income found" }, { status: 404 });
    }

    return NextResponse.json({ countIncome });
  } catch (err) {
    return NextResponse.json(
      { message: `Error fetching count income --> ${err}` },
      { status: 500 }
    );
  }
}
