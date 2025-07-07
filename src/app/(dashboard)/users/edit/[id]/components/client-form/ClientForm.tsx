"use client";

import React from "react";
import UserForm from "@/app/(dashboard)/users/components/form/user-form";
import useFindUser from "@/query-api/useFindUser";
import LoadingDot from "@/components/loading/LoadingDot";

function ClientForm({
  id,
  classId,
  userId,
  price,
}: {
  id: string;
  classId: string;
  userId: string;
  price: number;
}) {
  const { data, isPending } = useFindUser(id);

  const findPricePaid = data?.paidAmounts?.find(
    (item) => item?.subClass?.id === classId && item?.user?.id === id
  );

  return (
    <div className="flex justify-center items-center w-full">
      {isPending || !data ? (
        <div className="flex justify-center items-center">
          <LoadingDot />
        </div>
      ) : (
        <UserForm
          classId={classId}
          userId={userId}
          defaultValues={{
            name: data.name,
            nationalCode: String(data.nationalCode),
            phone: data.phone,
            motherName: data.motherName,
            fatherName: data.fatherName,
            birthDate: new Date(data.birthDate),
            gender: data.gender === "male" ? "male" : "female",
            address: data.address,
            city: data.city,
            paidAmount: findPricePaid?.price ?? 0,
          }}
          price={price}
        />
      )}
    </div>
  );
}

export default ClientForm;
