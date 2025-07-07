import { z } from "zod";

const loginSchema = z.object({
  phone: z
    .string({ message: "شماره تلفن الزامی است" })
    .regex(/^(\+98|0)?9\d{9}$/, "شماره تلفن معتبر نیست"),

  password: z
    .string({ message: "رمز عبور الزامی است" })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$ %^&*-]).{8,}$/,
      "رمز عبور باید حداقل 8 کاراکتر باشد و شامل حروف بزرگ، حروف کوچک، اعداد و نمادهای خاص باشد"
    ),
});

export default loginSchema;
