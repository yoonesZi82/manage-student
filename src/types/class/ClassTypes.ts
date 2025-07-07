import SubClassTypes from "./SubClassTypes";

interface ClassTypes {
  id: string;
  name: string;
  subClassCount: number;
  subClass: SubClassTypes[];
  createdAt: Date;
  updatedAt: Date;
}

export default ClassTypes;
