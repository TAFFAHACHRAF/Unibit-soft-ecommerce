import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AddUserForm from "@/components/User/AddUserForm/page";

export const metadata: Metadata = {
  title:
    "",
  description: "",
};

const AddProductPage = () => {
  return (
    <DefaultLayout>
      <AddUserForm />
    </DefaultLayout>
  );
};

export default AddProductPage;