"use client";
import { useEffect, useState } from "react";

const UpdateUserForm = () => {
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    username: 0,
    password: "",
    phone: "",
  });


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const fetchUserData = async (userId:any) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`, { });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUserData(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${userData.id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User updated successfully");
        window.location.href = "/users"; 
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
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
                Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="title"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Username
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Password
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="password"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Phone
                </label>
                <input
                  required
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder="image"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-primary-dark"
              >
                Update user
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateUserForm;