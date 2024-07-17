import React from "react";
import { Metadata } from "next";
import Signin from "@/components/Auth/Signin";

export const metadata: Metadata = {
  title: "Next.js Login Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Login Page NextAdmin Dashboard Kit",
};

const SignIn: React.FC = () => {
  return (
    <div className="w-full p-4 sm:p-12.5 xl:p-15">
      <Signin />
    </div>
  );
};

export default SignIn;
