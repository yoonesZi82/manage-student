"use client";

import React, { useEffect, useState } from "react";
import { IconInfoCircle, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import classSchema from "../../schema/classSchema";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import useFindClass from "@/query-api/useFindClass";
import LoadingDot from "@/components/loading/LoadingDot";

function ClassForm({ id }: { id?: string }) {
  const pathname = usePathname();
  const isEdit = pathname.includes("/class/edit");
  const { data, isPending } = useFindClass(id || "");

  const classForm = useForm<z.infer<typeof classSchema>>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      subClassCount: 1,
    },
  });

  useEffect(() => {
    if (data) {
      classForm.setValue("name", data.name || "");
      classForm.setValue("subClassCount", data.subClassCount || 1);
    }
  }, [data, classForm]);

  const [loading, setLoading] = useState(false);

  const createClass = (data: z.infer<typeof classSchema>) => {
    setLoading(true);
    createClassMutation.mutate(data);
  };

  const createClassMutation = useMutation({
    mutationFn: async (data: z.infer<typeof classSchema>) => {
      setLoading(true);
      return axios.post("/api/class/create", data);
    },
    onSuccess: async () => {
      setLoading(false);
      toast.success("کلاس با موفقیت ایجاد شد.");
      classForm.reset();
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      if (err.response?.status === 403) {
        toast.error("کلاس قبلا ایجاد شده است.");
        return;
      } else {
        toast.error("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
      }
    },
  });

  const updateClass = (data: z.infer<typeof classSchema>) => {
    setLoading(true);
    updateClassMutation.mutate(data);
  };

  const updateClassMutation = useMutation({
    mutationFn: async (data: z.infer<typeof classSchema>) => {
      setLoading(true);
      return axios.put("/api/class/update", { id, ...data });
    },
    onSuccess: async () => {
      setLoading(false);
      toast.success("کلاس با موفقیت ویرایش شد.");
    },
    onError: (err: AxiosError) => {
      setLoading(false);

      if (err.response?.status === 403) {
        toast.error("یک کلاس با این نام از قبل وجود دارد");
        return;
      } else {
        toast.error("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
      }
    },
  });

  return (
    <>
      {id && isPending ? (
        <div className="flex justify-center items-center">
          <LoadingDot />
        </div>
      ) : (
        <form
          onSubmit={classForm.handleSubmit(isEdit ? updateClass : createClass)}
        >
          <Form {...classForm}>
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
              <FormField
                control={classForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3">
                    <FormLabel>نام کلاس</FormLabel>
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
                control={classForm.control}
                name="subClassCount"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3">
                    <FormLabel>تعداد زیر مجموعه کلاس</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                        <IconInfoCircle size={16} />
                        <Input
                          type="number"
                          inputMode="numeric"
                          className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                          placeholder="تعداد زیر مجموعه کلاس را وارد کنید ..."
                          value={field.value === 0 ? "" : field.value ?? ""}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (isNaN(value)) {
                              field.onChange(0);
                            } else if (value > 6) {
                              field.onChange(6);
                            } else if (value < 1) {
                              field.onChange(1);
                            } else {
                              field.onChange(value);
                            }
                          }}
                        />
                      </div>
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
                <IconLoader2 className="animate-spin" size={16} />
              ) : isEdit ? (
                "ویرایش کلاس"
              ) : (
                "ایجاد کلاس"
              )}
            </Button>
          </Form>
        </form>
      )}
    </>
  );
}

export default ClassForm;
