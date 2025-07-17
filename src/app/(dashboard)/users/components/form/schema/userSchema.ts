import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "نام الزامی است"),
  phone: z.string().regex(/^(\+98|0)?9\d{9}$/g, "شماره تلفن معتبر نیست"),
  fatherName: z.string().min(1, "نام پدر الزامی است"),
  birthDate: z.date({ message: "تاریخ تولد الزامی است" }),
  gender: z.enum(["male", "female"], { message: "جنسیت الزامی است" }),
  address: z.string({ message: "آدرس الزامی است" }).min(1, "آدرس الزامی است"),
  city: z.string({ message: "شهر الزامی است" }).min(1, "شهر الزامی است"),
  paidAmount: z.number().min(0, "مبلغ پرداختی نمی‌تواند منفی باشد").optional(),
});

export default userSchema;
