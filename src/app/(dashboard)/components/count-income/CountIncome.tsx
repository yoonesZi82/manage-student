"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetCountIncome from "@/query-api/useGetCountIncome";
import AnimatedCounter from "@/components/animate-counter/AnimateCounter";
import { Skeleton } from "@/components/ui/skeleton";

function CountIncome() {
  const { data, isPending } = useGetCountIncome();
  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center w-full h-full">
          <Skeleton className="bg-primary/20 rounded-xl w-full h-[200px]" />
        </div>
      ) : (
        <Card className="@container/card justify-between h-full min-h-[200px] max-h-[200px]">
          {!data ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-muted-foreground">هیچ پرداختی موجود نیست</p>
            </div>
          ) : (
            <>
              <CardHeader className="flex flex-col justify-between">
                <div className="flex justify-between items-center w-full">
                  <CardDescription>تعداد پرداختی ها</CardDescription>
                </div>
                <CardTitle className="mt-4 font-semibold text-2xl lg:text-3xl">
                  <AnimatedCounter to={data.countIncome} isPrice={false} />
                  <span className="mr-1 text-sm">عدد</span>
                </CardTitle>
              </CardHeader>
            </>
          )}
        </Card>
      )}
    </>
  );
}

export default CountIncome;
