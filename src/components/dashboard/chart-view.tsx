"use client";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import useGetChart from "@/query-api/useGetChart";
import { format } from "date-fns-jalali";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function ChartView() {
  const { data: chartData = [], isPending } = useGetChart(); // expected: [{ date: "2025-06-01", totalAmount: 85000000 }]

  const finalData = chartData.map((item) => ({
    ...item,
    date: format(new Date(item.date), "yyyy/MM/dd"),
    desktop: item.totalAmount,
  }));

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center w-full h-full">
          <Skeleton className="bg-primary/20 rounded-xl w-full h-[400px]" />
        </div>
      ) : (
        <Card className="@container/card">
          <CardHeader>
            <CardTitle>نمودار درآمد</CardTitle>
            <CardDescription>
              <span className="hidden @[540px]/card:block">
                نمایش مجموع درآمد در ماه‌های اخیر
              </span>
              <span className="@[540px]/card:hidden">میزان درآمد ماهانه</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="px-2 sm:px-6 pt-4 sm:pt-6">
            <ChartContainer config={chartConfig} className="w-full h-[250px]">
              <AreaChart data={finalData}>
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const [month] = value.split("/");
                    const persianMonths = [
                      "فروردین",
                      "اردیبهشت",
                      "خرداد",
                      "تیر",
                      "مرداد",
                      "شهریور",
                      "مهر",
                      "آبان",
                      "آذر",
                      "دی",
                      "بهمن",
                      "اسفند",
                    ];
                    return persianMonths[month - 1] || value;
                  }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => formatPrice(value)}
                  width={20}
                />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white shadow-md px-4 py-2 rounded-md text-black text-sm">
                          <div>تاریخ: {label}</div>
                          <div>
                            درآمد این ماه: {formatPrice(payload[0].value)}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Area
                  dataKey="desktop"
                  type="monotone"
                  fill="url(#fillDesktop)"
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
}
