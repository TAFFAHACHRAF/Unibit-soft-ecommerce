"use client";
import Link from "next/link";
import React, { use, useState } from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import axios from "axios";

export default function Signup() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "",
        userData
      );
      alert("Registration successful");
      // Redirect or show success message
    } catch (error) {
      alert("Registration failed");
      console.error("Registration failed", error);
      // Handle error (show error message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md dark:bg-gray-800">
        <GoogleSigninButton text="Sign up" />

        <div className="my-6 flex items-center justify-center">
          <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
          <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
            Or sign up with email
          </div>
          <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        </div>

        <form onSubmit={handleSubmit}>
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
            placeholder="email"
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
            placeholder="+212..."
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
            >
            Save
          </button>
        </div>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
