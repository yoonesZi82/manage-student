import React from "react";
import ClientForm from "./components/client-form/ClientForm";

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ classId: string; price: string }>;
}) {
  const { id } = await params;
  const { classId, price } = await searchParams;

  return (
    <div className="w-full container">
      <fieldset className="px-4 py-8 border border-border rounded-lg text-center">
        <legend className="px-4">ویرایش کاربر</legend>
        {classId && id && price && (
          <ClientForm id={id} classId={classId} userId={id} price={+price} />
        )}
      </fieldset>
    </div>
  );
}

export default Page;
