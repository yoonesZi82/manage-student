import React from "react";
import ClassForm from "../../components/forms/class/class-form";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="w-full container">
      <fieldset className="px-4 py-8 border border-border rounded-lg text-center">
        <legend className="px-4">ویرایش اطلاعات کلاس</legend>
        {id && <ClassForm id={id} />}
      </fieldset>
    </div>
  );
}

export default Page;
