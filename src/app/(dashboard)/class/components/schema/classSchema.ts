import z from "zod";

const classSchema = z.object({
  name: z
    .string({ message: "نام کلاس را وارد کنید" })
    .min(1, {
      message: "نام کلاس را وارد کنید",
    })
    .max(50, {
      message: "نام کلاس نمیتواند بیشتر از 50 کاراکتر باشد",
    }),
  subClassCount: z
    .number({ message: "تعداد زیر مجموعه کلاس را وارد کنید" })
    .min(1, { message: "تعداد زیر مجموعه کلاس را وارد کنید" })
    .max(6, {
      message: "تعداد زیر مجموعه کلاس نمیتواند بیشتر از 6 باشد",
    }),
});

export default classSchema;
