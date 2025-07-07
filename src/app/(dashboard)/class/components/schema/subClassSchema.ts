import z from "zod";

const subClassSchema = z.object({
  name: z
    .string({ message: "نام کلاس را وارد کنید" })
    .min(1, {
      message: "نام کلاس را وارد کنید",
    })
    .max(50, {
      message: "نام کلاس نمیتواند بیشتر از 50 کاراکتر باشد",
    }),
  classId: z.string({ message: "کلاس را انتخاب کنید" }).min(1, {
    message: "کلاس را انتخاب کنید",
  }),
  totalAmount: z
    .number({ message: "مبلغ کلاس را وارد کنید" })
    .min(10000, "مبلغ کلاس را وارد کنید"),
  teacher: z
    .string({ message: "معلم را انتخاب کنید" })
    .min(1, "معلم را انتخاب کنید"),
  day: z.enum(
    [
      "SATURDAY",
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
    ],
    {
      message: "روز کلاس را انتخاب کنید",
    }
  ),
  startTime: z
    .string({ message: "ساعت شروع کلاس را وارد کنید" })
    .min(1, "ساعت شروع کلاس را وارد کنید"),
  endTime: z
    .string({ message: "ساعت پایان کلاس را وارد کنید" })
    .min(1, "ساعت پایان کلاس را وارد کنید"),
});

export default subClassSchema;
