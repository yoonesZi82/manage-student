import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // ۱. دریافت اولین و آخرین تاریخ پرداخت
    const firstPayment = await prisma.paidAmount.findFirst({
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    });

    const lastPayment = await prisma.paidAmount.findFirst({
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });

    if (!firstPayment || !lastPayment) {
      return NextResponse.json([], { status: 200 });
    }

    const start = new Date(firstPayment.createdAt);
    const end = new Date(lastPayment.createdAt);

    const startYear = start.getFullYear();
    const startMonth = start.getMonth();

    const endYear = end.getFullYear();
    const endMonth = end.getMonth();

    const results: { date: string; totalAmount: number }[] = [];

    for (let year = startYear; year <= endYear; year++) {
      const monthStart = year === startYear ? startMonth : 0;
      const monthEnd = year === endYear ? endMonth : 11;

      for (let month = monthStart; month <= monthEnd; month++) {
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

        const paidAmounts = await prisma.paidAmount.findMany({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
            status: { in: ["ACTIVE", "PENDING"] },
          },
          include: { subClass: true },
        });

        const totalAmount = paidAmounts.reduce((sum, item) => {
          // چه ACTIVE چه PENDING فقط price را می‌گیریم
          return sum + (item.price ?? 0);
        }, 0);

        results.push({
          date: `${year}-${String(month + 1).padStart(2, "0")}-01`,
          totalAmount,
        });
      }
    }

    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    console.error("Error in income chart API:", err);
    return NextResponse.json(
      { message: "خطا در پردازش نمودار درآمد" },
      { status: 500 }
    );
  }
}
