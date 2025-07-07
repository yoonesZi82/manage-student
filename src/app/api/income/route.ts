import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    // start and end of current month
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfCurrentMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    // start and end of last month
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999
    );

    // income of current month
    const currentMonthData = await prisma.paidAmount.findMany({
      where: {
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
        status: {
          in: ["ACTIVE", "PENDING"],
        },
      },
    });

    // sum of income of current month
    const currentMonthIncome = currentMonthData.reduce(
      (sum, item) => sum + item.price,
      0
    );

    // income of last month
    const lastMonthData = await prisma.paidAmount.findMany({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
        status: {
          in: ["ACTIVE", "PENDING"],
        },
      },
    });

    // sum of income of last month
    const lastMonthIncome = lastMonthData.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const percentageChange =
      lastMonthIncome === 0
        ? 100
        : ((currentMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;

    return NextResponse.json({
      currentMonthIncome,
      percentageChange: Math.round(percentageChange * 100) / 100,
    });
  } catch (err) {
    return NextResponse.json(
      { message: `Unknown error in get income month --> ${err}` },
      { status: 500 }
    );
  }
}
