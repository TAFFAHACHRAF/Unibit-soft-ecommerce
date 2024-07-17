"use client";
import { useEffect, useState } from "react";

const UpdateProductForm = () => {
  const [productData, setProductData] = useState({
    id:0,
    title: "",
    price: 0,
    description: "",
    image: "",
    category: ""
  });


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    if (productId) {
      fetchProductData(productId);
    }
  }, []);

  const fetchProductData = async (productId:any) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`, { });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setProductData(data);
      } else {
        console.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productData.id}`, {
        method: "PUT",
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log("Product updated successfully");
        window.location.href = "/products"; 
      } else {
        console.error("Failed to update product data");
      }
    } catch (error) {
      console.error("Error updating product data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-9">
          {/* Input Fields */}
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
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-primary-dark"
              >
                Update product
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProductForm;