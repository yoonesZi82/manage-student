import SubClassTypes from "../class/SubClassTypes";
import PaidAmountTypes from "../paid/PaidAmountTypes";

interface UserTypes {
  id: string;
  name: string;
  phone: string;
  fatherName: string;
  birthDate: Date;
  gender: "male" | "female";
  address: string;
  city: string;
  paidAmounts: PaidAmountTypes[];
  userSubClasses?: {
    subClass: SubClassTypes;
  };
  createdAt: Date;
  updatedAt: Date;
}

export default UserTypes;
