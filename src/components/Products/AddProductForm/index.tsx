"use client"

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: ""
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {

      const requestBody = {
        ...productData
      };

      console.log("Request Body:", requestBody);

      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('Product added successfully')
        console.log("Product added successfully");
        window.location.href = "/products"; 
      } else {
        alert('Failed to add product data')
        console.error("Failed to add product data");
      }
    } catch (error) {
      console.error("Error adding product data:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add Product" url=""/>

      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">Input Fields</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  placeholder="title"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Price
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Description
                </label>
                <input
                  required
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  placeholder="description"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Image
                </label>
                <input
                  required
                  type="text"
                  name="image"
                  value={productData.image}
                  onChange={handleChange}
                  placeholder="image"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  placeholder="category"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-opacity-90 focus:outline-none"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProductForm;