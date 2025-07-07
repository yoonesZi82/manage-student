import React from "react";
import UserForm from "../components/form/user-form";

function page() {
  return (
    <div className="w-full container">
      <fieldset className="px-4 py-8 border border-border rounded-lg text-center">
        <legend className="px-4">ایجاد کاربر</legend>
        <UserForm />
      </fieldset>
    </div>
  );
}

export default page;
