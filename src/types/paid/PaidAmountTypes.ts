import UserTypes from "../user/UserTypes";
import SubClassTypes from "../class/SubClassTypes";

interface PaidAmountTypes {
  id: string;
  price: number;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  user: UserTypes;
  subClass: SubClassTypes;
  createdAt: Date;
  updatedAt: Date;
}

export default PaidAmountTypes;
