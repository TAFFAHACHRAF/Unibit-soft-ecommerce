import { Metadata } from "next";
import React from "react";
import Signin from "@/components/Auth/Signin";

export const metadata: Metadata = {
  title:
    "UNIBIT SOFT E-commerce",
  description: "UNIBIT SOFT E-commerce",
};

export default function Home() {

  return (
    <>  
      <div>
        <Signin />
      </div>
    </>
  );
}
