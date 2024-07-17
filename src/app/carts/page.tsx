"use client"

import React, { useEffect, useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Cart } from '@/types/cart';

const CartsTablePage = () => {
  const [cartData, setCartData] = useState<Cart[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cartsPerPage] = useState<number>(10); 

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/carts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartData(data);
        } else {
          console.error('Failed to fetch carts data');
        }
      } catch (error) {
        console.error('Error fetching carts data', error);
      }
    };

    fetchCarts();
  }, []);

  const handleUpdate = (cartId: any) => {
    window.location.href = `/carts/update?id=${cartId}`;
  };

  const handleDelete = async (cartId: any) => {
    try {
      const response = await fetch(``, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Cart deleted with success');
        console.log(`Cart with ID ${cartId} deleted successfully`);
      } else {
        console.error(`Failed to delete cart with ID ${cartId}`);
      }
    } catch (error) {
      console.error(`Error deleting cart with ID ${cartId}:`, error);
    }
  };

  const handleConsult = (cartId: any) => {
    window.location.href = `/carts/update?id=${cartId}`;
  };

  const handleAddCart = () => {
    window.location.href = "/carts/add";
  };

  const filteredCarts = cartData.filter(cart =>
    cart.id.toString().includes(searchTerm.toLocaleLowerCase()) ||
    cart.userId.toString().includes(searchTerm.toLocaleLowerCase()) ||
    cart.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCart = currentPage * cartsPerPage;
  const indexOfFirstCart = indexOfLastCart - cartsPerPage;
  const currentCarts = filteredCarts.slice(indexOfFirstCart, indexOfLastCart);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Carts" url=""/>

      <div className="flex flex-col gap-10">
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search carts..."
              className="px-4 py-2 border border-gray-300 rounded bg-[#F7F9FC] text-left dark:bg-dark-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleAddCart} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Cart
            </button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                  Cart ID
                </th>
                <th className="min-w-[180px] px-4 py-4 font-medium text-dark dark:text-white">
                  User ID
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Creation date
                </th> 
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCarts.map((cart, index) => (
                <tr key={index} className={`${index === currentCarts.length - 1 ? "border-b-0" : "border-b"} border-[#eee] px-4 py-4 dark:border-dark-3`}>
                  <td className="text-dark dark:text-white">
                    {cart.id}
                  </td>
                  <td className="text-dark dark:text-white">
                    {cart.userId}
                  </td>
                  <td className="text-dark dark:text-white">
                    {cart.date}
                  </td>
                  <td className="flex space-x-4 text-dark dark:text-white">
                    <button onClick={() => handleUpdate(cart.id)} className="hover:text-blue-500">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(cart.id)} className="hover:text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={() => handleConsult(cart.id)} className="hover:text-green-500">
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
                {Array.from({ length: Math.ceil(filteredCarts.length / cartsPerPage) }, (_, i) => (
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

export default CartsTablePage;
