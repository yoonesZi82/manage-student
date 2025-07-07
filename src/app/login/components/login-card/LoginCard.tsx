"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import LoginForm from "../form/LoginForm";

function LoginCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg"
    >
      <Card className="shadow-none border-none rounded-xl w-full max-w-lg">
        <CardHeader className="flex flex-col justify-center items-center gap-3 w-full">
          <CardTitle className="font-bold text-black dark:text-muted-foreground text-2xl">
            خوش آمدید
          </CardTitle>
          <CardDescription>
            برای ورود به سامانه لطفا اطلاعات خود را وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default LoginCard;
