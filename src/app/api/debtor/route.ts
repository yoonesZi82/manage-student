import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const payments = await prisma.paidAmount.findMany({
      where: {
        status: {
          in: ["PENDING", "INACTIVE"],
        },
      },
      include: {
        subClass: true,
      },
    });

    let totalDebtor = 0;

    for (const payment of payments) {
      if (payment.status === "PENDING") {
        const remaining = payment.subClass.totalAmount - payment.price;
        totalDebtor += remaining;
      } else if (payment.status === "INACTIVE") {
        totalDebtor += payment.subClass.totalAmount;
      }
    }

    return NextResponse.json({ totalDebtor });
  } catch (err) {
    return NextResponse.json(
      { message: `Error fetching pending/inactive gap total --> ${err}` },
      { status: 500 }
    );
  }
}
