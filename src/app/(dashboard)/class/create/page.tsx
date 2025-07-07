"use client";
import React from "react";
import ClassForm from "../components/forms/class/class-form";
import SubClassForm from "../components/forms/class/sub-class-form";

function Page() {
  return (
    <div className="w-full container">
      <fieldset className="px-4 py-8 border border-border rounded-lg text-center">
        <legend className="px-4">اطلاعات کلاس</legend>
        <ClassForm />
        <hr className="my-8 border border-border border-dashed" />
        <SubClassForm />
      </fieldset>
    </div>
  );
}

export default Page;
