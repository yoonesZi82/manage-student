import React from "react";
import SubClassForm from "../../../components/forms/class/sub-class-form";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="w-full container">
      <fieldset className="px-4 py-8 border border-border rounded-lg text-center">
        <legend className="px-4">اطلاعات زیر مجموعه کلاس</legend>
        {id && <SubClassForm id={id} />}
      </fieldset>
    </div>
  );
}

export default Page;
