import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatDate(date: Date) {
  const formatted = format(date, "d MMMM yyyy", { locale: faIR });
  return formatted;
}

function formatPrice(number: number) {
  return number.toLocaleString("fa-IR") + " تومان";
}

function formatDay(
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
) {
  return day === "MONDAY"
    ? "دوشنبه"
    : day === "TUESDAY"
    ? "سه شنبه"
    : day === "WEDNESDAY"
    ? "چهارشنبه"
    : day === "THURSDAY"
    ? "پنجشنبه"
    : day === "FRIDAY"
    ? "جمعه"
    : "شنبه";
}

function truncateEmail(email: string, maxLength = 20): string {
  if (email.length <= maxLength) return email;

  const [user, domain] = email.split("@");
  const shortenedUser = user.length > 10 ? user.slice(0, 10) + "…" : user;
  return `${shortenedUser}@${domain}`;
}

export { cn, formatDate, formatPrice, formatDay, truncateEmail };
