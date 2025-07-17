import z from "zod";

const classSchema = z.object({
  name: z
    .string({ message: "نام کلاس را وارد کنید" })
    .min(1, {
      message: "نام کلاس را وارد کنید",
    })
    .max(100, {
      message: "نام کلاس نمیتواند بیشتر از 100 کاراکتر باشد",
    }),
  subClassCount: z
    .number({ message: "تعداد زیر مجموعه کلاس را وارد کنید" })
    .min(1, { message: "تعداد زیر مجموعه کلاس را وارد کنید" })
    .max(100, {
      message: "تعداد زیر مجموعه کلاس نمیتواند بیشتر از 100 باشد",
    }),
});

export default classSchema;
