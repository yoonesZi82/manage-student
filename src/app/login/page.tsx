import React from "react";
import LoginCard from "./components/login-card/LoginCard";

function page() {
  return (
    <div className="bg-primary/50 w-full container">
      <div className="flex justify-center items-center w-full h-screen">
        <LoginCard />
      </div>
    </div>
  );
}

export default page;
