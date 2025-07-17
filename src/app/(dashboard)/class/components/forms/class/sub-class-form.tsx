"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { IconInfoCircle, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import subClassSchema from "../../schema/subClassSchema";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetClass from "@/query-api/useGetClass";
import ClassTypes from "@/types/class/ClassTypes";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import TimePicker from "react-time-picker";
import useFindSubClass from "@/query-api/useFindSubClass";
import LoadingDot from "@/components/loading/LoadingDot";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function SubClassForm({ id }: { id?: string }) {
  const pathname = usePathname();
  const isEdit = pathname.includes("/sub/edit");
  const { data: classList, isPending } = useGetClass();
  const { data: subClass, isPending: isSubClassPending } = useFindSubClass(
    id || ""
  );

  const subClassForm = useForm<z.infer<typeof subClassSchema>>({
    resolver: zodResolver(subClassSchema),
    defaultValues: {
      name: "",
      classId: "",
      totalAmount: 10000,
      teacher: "",
      day: "SATURDAY",
      startTime: "08:00",
      endTime: "10:00",
    },
  });

  useEffect(() => {
    if (subClass) {
      subClassForm.setValue("name", subClass.name || "");
      subClassForm.setValue("classId", subClass.classId || "");
      subClassForm.setValue("totalAmount", subClass.totalAmount || 10000);
      subClassForm.setValue("teacher", subClass.teacher || "");
      subClassForm.setValue("day", subClass.day || "SATURDAY");
      subClassForm.setValue("startTime", subClass.startTime || "08:00");
      subClassForm.setValue("endTime", subClass.endTime || "10:00");
    }
  }, [subClass, subClassForm]);

  const [loading, setLoading] = useState(false);

  function createSubClass(data: z.infer<typeof subClassSchema>) {
    setLoading(true);
    createSubClassMutation.mutate(data);
  }

  const createSubClassMutation = useMutation({
    mutationFn: async (data: z.infer<typeof subClassSchema>) => {
      setLoading(true);
      return axios.post("/api/class/sub/create", data);
    },
    onSuccess: async (_, variables) => {
      setLoading(false);
      toast.success(`${variables.name}  با موفقیت ایجاد شد.`);
      subClassForm.reset();
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      if (err.response?.status === 403) {
        toast.error("تعداد زیر مجموعه های کلاس به حداکثر رسیده است.");
        return;
      }
      if (err.response?.status === 402) {
        toast.error("زیر مجموعه مورد نظر قبلاً ایجاد شده است.");
        return;
      } else {
        toast.error("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
      }
    },
  });

  function updateSubClass(data: z.infer<typeof subClassSchema>) {
    setLoading(true);
    updateSubClassMutation.mutate(data);
  }

  const updateSubClassMutation = useMutation({
    mutationFn: async (data: z.infer<typeof subClassSchema>) => {
      setLoading(true);
      return axios.put("/api/class/sub/update", {
        id,
        ...data,
      });
    },
    onSuccess: async (_, variables) => {
      setLoading(false);
      toast.success(`${variables.name}  با موفقیت ویرایش شد.`);
    },
    onError: () => {
      setLoading(false);
      toast.error("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
    },
  });

  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
  };

  return (
    <>
      {id && isSubClassPending ? (
        <div className="flex justify-center items-center">
          <LoadingDot />
        </div>
      ) : (
        <form
          onSubmit={
            isEdit
              ? subClassForm.handleSubmit(updateSubClass)
              : subClassForm.handleSubmit(createSubClass)
          }
        >
          <Form {...subClassForm}>
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
              <FormField
                control={subClassForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3 col-span-1 lg:col-span-2">
                    <FormLabel>نام زیر مجموعه کلاس</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                        <IconInfoCircle size={16} />
                        <Input
                          type="text"
                          className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                          placeholder="نام کلاس را وارد کنید ..."
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={subClassForm.control}
                name="classId"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3">
                    <FormLabel>انتخاب کلاس</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="flex-row-reverse shadow-none py-5.5 rounded-lg w-full">
                          <SelectValue placeholder="انتخاب کلاس" />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                          {isPending ? (
                            <SelectItem
                              value="loading"
                              className="flex justify-center items-center"
                            >
                              <IconLoader2 className="animate-spin" size={16} />
                            </SelectItem>
                          ) : !classList?.length ? (
                            <SelectItem value="no-data" disabled>
                              کلاسی یافت نشد
                            </SelectItem>
                          ) : (
                            classList.map((item: ClassTypes) => (
                              <SelectItem
                                key={item.id}
                                value={item.id}
                                className={cn(
                                  subClassForm.watch("classId") === item.id &&
                                    "bg-primary text-primary-foreground"
                                )}
                              >
                                {item.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={subClassForm.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3">
                    <FormLabel>مبلغ کلاس</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                        <IconInfoCircle size={16} />
                        <Input
                          type="text"
                          className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                          placeholder="مبلغ کلاس را وارد کنید ..."
                          value={formatAmount(field.value)}
                          onInput={(e) => {
                            const value = e.currentTarget.value.replace(
                              /,/g,
                              ""
                            );
                            // Ensure the value is a valid number or default to 0
                            const parsedValue = value ? parseInt(value) : 0;
                            field.onChange(parsedValue);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={subClassForm.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3">
                    <FormLabel>نام معلم</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                        <IconInfoCircle size={16} />
                        <Input
                          type="text"
                          className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                          placeholder="نام معلم را وارد کنید ..."
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={subClassForm.control}
                name="day"
                render={() => (
                  <FormItem className="flex flex-col gap-3">
                    <FormLabel>روز کلاس</FormLabel>
                    <FormControl>
                      <Select
                        value={subClassForm.watch("day")}
                        onValueChange={(val) =>
                          subClassForm.setValue(
                            "day",
                            val as
                              | "SATURDAY"
                              | "SUNDAY"
                              | "MONDAY"
                              | "TUESDAY"
                              | "WEDNESDAY"
                              | "THURSDAY"
                              | "FRIDAY"
                          )
                        }
                      >
                        <SelectTrigger className="flex-row-reverse shadow-none py-5.5 rounded-lg w-full">
                          <SelectValue placeholder="انتخاب روز کلاس" />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                          <SelectItem value="SATURDAY">شنبه</SelectItem>
                          <SelectItem value="SUNDAY">یکشنبه</SelectItem>
                          <SelectItem value="MONDAY">دوشنبه</SelectItem>
                          <SelectItem value="TUESDAY">سه شنبه</SelectItem>
                          <SelectItem value="WEDNESDAY">چهارشنبه</SelectItem>
                          <SelectItem value="THURSDAY">پنجشنبه</SelectItem>
                          <SelectItem value="FRIDAY">جمعه</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={subClassForm.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3">
                    <FormLabel>ساعت شروع کلاس</FormLabel>
                    <FormControl>
                      <TimePicker
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        format="HH:mm"
                        disableClock
                        clearIcon={null}
                        className="[&_div_div]:flex [&_div_div]:flex-row-reverse [&_div_div]:justify-between [&_div_div]:items-center [&_div_div]:gap-4 [&_input]:!px-3 [&_input]:!py-2 [&_input]:!border [&_input]:!border-input [&_input]:!rounded-md w-full [&_input]:!w-full [&>div]:!w-full !text-sm [&_input]:!text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={subClassForm.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3">
                    <FormLabel>ساعت پایان کلاس</FormLabel>
                    <FormControl>
                      <TimePicker
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        format="HH:mm"
                        disableClock
                        clearIcon={null}
                        className="[&_div_div]:flex [&_div_div]:flex-row-reverse [&_div_div]:justify-between [&_div_div]:items-center [&_div_div]:gap-4 [&_input]:!px-3 [&_input]:!py-2 [&_input]:!border [&_input]:!border-input [&_input]:!rounded-md w-full [&_input]:!w-full [&>div]:!w-full !text-sm [&_input]:!text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={loading}
            >
              {loading ? (
                <LoadingDot />
              ) : isEdit ? (
                "ویرایش زیر مجموعه کلاس"
              ) : (
                "ایجاد زیر مجموعه کلاس"
              )}
            </Button>
          </Form>
        </form>
      )}
    </>
  );
}

export default SubClassForm;
