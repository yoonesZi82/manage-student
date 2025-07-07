import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const countDebtor = await prisma.paidAmount.count({
      where: {
        status: "INACTIVE",
      },
    });

    if (!countDebtor) {
      return NextResponse.json({ message: "No debtor found" }, { status: 404 });
    }

    return NextResponse.json({ countDebtor });
  } catch (err) {
    return NextResponse.json(
      { message: `Error fetching count debtor --> ${err}` },
      { status: 500 }
    );
  }
}
