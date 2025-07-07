"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconTrendingUp } from "@tabler/icons-react";
import useGetMouthIncome from "@/query-api/useGetMouthIncom";
import { cn } from "@/lib/utils";
import AnimateCounter from "@/components/animate-counter/AnimateCounter";
import { Skeleton } from "@/components/ui/skeleton";

function Income() {
  const { data, isPending } = useGetMouthIncome();

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center w-full h-full">
          <Skeleton className="bg-primary/20 rounded-xl w-full h-[200px]" />
        </div>
      ) : (
        <Card className="@container/card justify-between h-full min-h-[200px] max-h-[200px]">
          <CardHeader className="flex flex-col justify-between">
            <div className="flex justify-between items-center w-full">
              <CardDescription>درآمد</CardDescription>
              {data ? (
                <CardAction>
                  <Badge
                    variant="outline"
                    className={cn(
                      data.percentageChange > 0
                        ? "bg-success "
                        : "bg-destructive ",
                      "text-white"
                    )}
                  >
                    <IconTrendingUp />
                    {data.percentageChange}
                    {data.percentageChange > 0 ? "+" : ""}
                  </Badge>
                </CardAction>
              ) : null}
            </div>
            {data ? (
              <CardTitle className="mt-4 font-semibold text-2xl lg:text-3xl">
                <AnimateCounter to={data.currentMonthIncome} />
              </CardTitle>
            ) : (
              <p className="text-muted-foreground">
                هیچ پرداختی در این ماه نداریم
              </p>
            )}
          </CardHeader>
          <CardFooter className="pb-0 text-sm">
            <p className="text-muted-foreground">مبلغ پرداختی در این ماه</p>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default Income;
