"use client";
import { useEffect, useState } from "react";

const UpdateCartForm = () => {
  const [cartData, setCartData] = useState({
    id:"",
    userId: "",
    date: "",
  });


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cartId = urlParams.get("id");
    if (cartId) {
      fetchCartData(cartId);
    }
  }, []);

  const fetchCartData = async (cartId:any) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, { });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setCartData(data);
      } else {
        console.error("Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setCartData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${cartData.id}`, {
        method: "PUT",
        body: JSON.stringify(cartData),
      });

      if (response.ok) {
        console.log("Cart updated successfully");
        window.location.href = "/carts"; 
      } else {
        console.error("Failed to update cart data");
      }
    } catch (error) {
      console.error("Error updating cart data:", error);
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
                UserId
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  value={cartData.userId}
                  onChange={handleChange}
                  placeholder="title"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-primary-dark"
              >
                Update cart
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateCartForm;