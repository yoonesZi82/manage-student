import ClassTypes from "./ClassTypes";
import UserTypes from "../user/UserTypes";
import PaidAmountTypes from "../paid/PaidAmountTypes";

interface SubClassTypes {
  id: string;
  classId: string;
  name: string;
  class: ClassTypes;
  userSubClasses?: { user: UserTypes; subClass: SubClassTypes }[];
  teacher: string;
  totalAmount: number;
  startTime: string;
  endTime: string;
  paidAmounts: PaidAmountTypes[];
  day:
    | "SATURDAY"
    | "SUNDAY"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY";
  createdAt: Date;
  updatedAt: Date;
}

export default SubClassTypes;
