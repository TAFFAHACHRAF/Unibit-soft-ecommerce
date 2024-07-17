import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AddProductForm from "@/components/Products/AddProductForm";

export const metadata: Metadata = {
  title:
    "",
  description: "",
};

const AddProductPage = () => {
  return (
    <DefaultLayout>
      <AddProductForm />
    </DefaultLayout>
  );
};

export default AddProductPage;