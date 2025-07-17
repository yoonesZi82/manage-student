"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "./schema/userSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import LoadingDot from "@/components/loading/LoadingDot";
import { formatPrice } from "@/lib/utils";

function UserForm({
  defaultValues,
  classId,
  userId,
  price,
}: {
  defaultValues?: z.infer<typeof userSchema>;
  classId?: string;
  userId?: string;
  price?: number;
}) {
  const pathname = usePathname();
  const isEdit = pathname.includes("/users/edit");

  const userForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      phone: defaultValues?.phone ?? "",
      fatherName: defaultValues?.fatherName ?? "",
      birthDate: defaultValues?.birthDate ?? new Date(),
      gender: defaultValues?.gender ?? "female",
      address: defaultValues?.address ?? "",
      city: defaultValues?.city ?? "",
      paidAmount: defaultValues?.paidAmount ?? 0,
    },
  });

  const [loading, setLoading] = useState(false);

  const createUser = (data: z.infer<typeof userSchema>) => {
    setLoading(true);
    createUserMutation.mutate(data);
  };

  const createUserMutation = useMutation({
    mutationFn: async (data: z.infer<typeof userSchema>) => {
      setLoading(true);
      return axios.post("/api/user/create", data);
    },
    onSuccess: async () => {
      setLoading(false);
      toast.success("کاربر با موفقیت ایجاد شد.");
      userForm.reset();
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      if (err.response?.status === 401) {
        toast.error("کاربر قبلا ایجاد شده است.");
        return;
      } else {
        toast.error("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
      }
    },
  });

  const updateUser = (data: z.infer<typeof userSchema>) => {
    setLoading(true);
    updateUserMutation.mutate(data);
  };

  const updateUserMutation = useMutation({
    mutationFn: async (data: z.infer<typeof userSchema>) => {
      setLoading(true);
      return axios.put("/api/user/update", { classId, userId, ...data });
    },
    onSuccess: async () => {
      setLoading(false);
      toast.success("کاربر با موفقیت ویرایش شد.");
      location.reload();
      userForm.reset();
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      if (err.response?.status === 402) {
        toast.error("مبلغ پرداختی بیشتر از مبلغ کل کلاس نمی‌تواند باشد.");
        return;
      }
      if (err.response?.status === 409) {
        toast.error("کاربری با این کد ملی یا شماره تلفن قبلا ایجاد شده است.");
        return;
      }
      toast.error("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
    },
  });

  return (
    <form
      onSubmit={
        isEdit
          ? userForm.handleSubmit(updateUser)
          : userForm.handleSubmit(createUser)
      }
      className="w-full"
    >
      <Form {...userForm}>
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
          <FormField
            control={userForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                    <IconInfoCircle size={16} />
                    <Input
                      type="text"
                      className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                      placeholder="نام و نام خانوادگی را وارد کنید ..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>شماره تلفن</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                    <IconInfoCircle size={16} />
                    <Input
                      type="text"
                      className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                      placeholder="شماره تلفن را وارد کنید ..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="fatherName"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>نام پدر</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                    <IconInfoCircle size={16} />
                    <Input
                      type="text"
                      className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                      placeholder="نام پدر را وارد کنید ..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="birthDate"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>تاریخ تولد</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date.toDate());
                        } else {
                          field.onChange(undefined);
                        }
                      }}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      inputClass="border border-border  px-2 py-2.5 rounded-lg w-full"
                      placeholder="تاریخ تولد را انتخاب کنید"
                      format="YYYY/MM/DD"
                      containerStyle={{ width: "100%" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={userForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>جنسیت</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="flex-row-reverse shadow-none py-5.5 border-border rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 w-full">
                      <SelectValue placeholder="انتخاب جنسیت" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                      <SelectItem value="male">مرد</SelectItem>
                      <SelectItem value="female">زن</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>شهر</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                    <IconInfoCircle size={16} />
                    <Input
                      type="text"
                      className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                      placeholder="شهر را وارد کنید ..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 col-span-2">
                <FormLabel>آدرس</FormLabel>
                <FormControl>
                  <Textarea
                    className="shadow-none border-border rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 w-full min-h-[200px] resize-none"
                    placeholder="آدرس را وارد کنید ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEdit ? (
            <FormField
              control={userForm.control}
              name="paidAmount"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 col-span-2">
                  <div className="flex flex-col items-start gap-1">
                    <FormLabel>مبلغ پرداختی (تومان)</FormLabel>
                    <small className="text-muted-foreground text-xs">
                      مبلغ کل کلاس :{formatPrice(price ?? 0)}
                    </small>
                  </div>
                  <FormControl>
                    <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                      <IconInfoCircle size={16} />
                      <Input
                        type="text"
                        className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                        placeholder="مبلغ پرداختی را وارد کنید (اختیاری)"
                        {...field}
                        value={
                          field?.value && field.value > 0
                            ? field.value.toLocaleString()
                            : ""
                        }
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, "");
                          field.onChange(value ? parseInt(value) : undefined);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </div>
        {isEdit ? (
          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full"
            disabled={loading}
          >
            {loading ? <LoadingDot /> : "ویرایش کاربر"}
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full"
            disabled={loading}
          >
            {loading ? <LoadingDot /> : "ایجاد کاربر"}
          </Button>
        )}
      </Form>
    </form>
  );
}

export default UserForm;
