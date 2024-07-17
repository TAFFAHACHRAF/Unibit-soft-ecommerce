"use client"

import React, { useEffect, useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserDTO } from '@/types/user';

const UserPage = () => {
  const [userData, setUserData] = useState<UserDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch users data');
        }
      } catch (error) {
        console.error('Error fetching users data', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (userId: any) => {
    window.location.href = `/users/update?id=${userId}`;
  };

  const handleDelete = async (userId: any) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUserData(prevUsers => prevUsers.filter(user => user.id !== userId));
        alert('User deleted with success');
        console.log(`User with ID ${userId} deleted successfully`);
        // window.location.reload();
      } else {
        console.error(`Failed to delete user with ID ${userId}`);
      }
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  const handleConsult = (userId: any) => {
    window.location.href = `/users/update?id=${userId}`;
  };

  const handleAddUser = () => {
    window.location.href = "/users/add";
  };

  // Filtering users based on search term
  const filteredUsers = userData.filter(user =>
    // user.address.geolocation.lat.toString().includes(searchTerm.toLocaleLowerCase()) ||
    // user.address.geolocation.long.toString().includes(searchTerm.toLocaleLowerCase()) ||
    user.address.city.includes(searchTerm.toLocaleLowerCase()) ||
    // user.address.street.includes(searchTerm.toLocaleLowerCase()) ||
    // user.address.number.toString().includes(searchTerm.toLocaleLowerCase()) ||
    // user.address.zipcode.includes(searchTerm.toLocaleLowerCase()) ||
    user.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.includes(searchTerm.toLocaleLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // user.password.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.name.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    // user.__v.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUser = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" url=""/>

      <div className="flex flex-col gap-10">
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border border-gray-300 rounded bg-[#F7F9FC] text-left dark:bg-dark-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleAddUser} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add User
            </button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                  User ID
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  First name
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Last name
                </th>
                <th className="min-w-[180px] px-4 py-4 font-medium text-dark dark:text-white">
                  Email
                </th>
                <th className="min-w-[180px] px-4 py-4 font-medium text-dark dark:text-white">
                  Username
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Phone
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUser.map((user, index) => (
                <tr key={index} className={`${index === currentUser.length - 1 ? "border-b-0" : "border-b"} border-[#eee] px-4 py-4 dark:border-dark-3`}>
                  <td className="text-dark dark:text-white">
                    {user.id}
                  </td>

                  <td className="text-dark dark:text-white">
                    {user.name.firstname}
                  </td>

                  <td className="text-dark dark:text-white">
                    {user.name.lastname}
                  </td>

                  <td className="text-dark dark:text-white">
                    {user.email}
                  </td>

                  <td className="text-dark dark:text-white">
                    {user.username}
                  </td>

                  <td className="text-dark dark:text-white">
                    {user.phone}
                  </td>

                  <td className="flex space-x-4 text-dark dark:text-white">
                    <button onClick={() => handleUpdate(user.id)} className="hover:text-blue-500">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="hover:text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={() => handleConsult(user.id)} className="hover:text-green-500">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-end mt-4">
            <nav className="block">
              <ul className="flex pl-0 list-none rounded my-2">
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
                  <li key={i} className="mx-1">
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded ${currentPage === i + 1 ? 'bg-gray-300' : ''}`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserPage;
