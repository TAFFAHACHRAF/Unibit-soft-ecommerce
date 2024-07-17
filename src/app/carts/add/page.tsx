import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AddCartForm from "@/components/Cart/AddCartForm/page";

export const metadata: Metadata = {
  title:
    "",
  description: "",
};

const AddProductPage = () => {
  return (
    <DefaultLayout>
      <AddCartForm />
    </DefaultLayout>
  );
};

export default AddProductPage;