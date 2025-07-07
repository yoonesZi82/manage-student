import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import loginSchema from "./schema/loginSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconLock, IconPhone } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import LoadingDot from "@/components/loading/LoadingDot";
import { signIn } from "next-auth/react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const login = (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    axios
      .post("/api/login", data)
      .then(async (res) => {
        if (res.status === 200) {
          setIsLoading(false);
          await signIn("credentials", {
            phone: data.phone,
            password: data.password,
            redirect: true,
            callbackUrl: "/",
          });
          toast.success("ورود با موفقیت انجام شد");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 404) {
          toast.error("کاربری با این شماره تلفن یافت نشد");
        } else if (err.response.status === 401) {
          toast.error("رمز عبور یا شماره تلفن اشتباه است");
        } else {
          toast.error("ورود با مشکل مواجه شد");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={loginForm.handleSubmit(login)} className="w-full">
      <Form {...loginForm}>
        <div className="flex flex-col gap-4">
          <FormField
            control={loginForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>شماره تلفن</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                    <IconPhone size={20} />
                    <Input
                      type="text"
                      className="placeholder:items-end shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full text-start"
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
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3">
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <div className="relative flex items-center gap-2 px-4 py-1 border border-border rounded-lg">
                    <IconLock className="text-muted-foreground" size={20} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="shadow-none border-0 focus-visible:ring-0"
                      {...field}
                    />
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="size-5 text-muted-foreground" />
                      ) : (
                        <EyeIcon className="size-5 text-muted-foreground" />
                      )}
                    </button>
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
          disabled={isLoading}
        >
          {isLoading ? <LoadingDot /> : "ورود به سامانه"}
        </Button>
      </Form>
    </form>
  );
}

export default LoginForm;
