"use client"

import React, { useEffect, useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '@/types/product';

const ProductTablePage = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        } else {
          console.error('Failed to fetch products data');
        }
      } catch (error) {
        console.error('Error fetching products data', error);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdate = (productId: any) => {
    window.location.href = `/products/update?id=${productId}`;
  };

  const handleDelete = async (productId: any) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setProductData(prevProducts => prevProducts.filter(product => product.id !== productId));
        alert('Product deleted with success');
        console.log(`Product with ID ${productId} deleted successfully`);
        // window.location.reload();
      } else {
        console.error(`Failed to delete product with ID ${productId}`);
      }
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
    }
  };

  const handleConsult = (productId: any) => {
    window.location.href = `/products/update?id=${productId}`;
  };

  const handleAddProduct = () => {
    window.location.href = "/products/add";
  };

  // Filtering products based on search term
  const filteredProducts = productData.filter(product =>
    product.id.toString().includes(searchTerm.toLocaleLowerCase()) ||
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().includes(searchTerm.toLocaleLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" url=""/>

      <div className="flex flex-col gap-10">
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded bg-[#F7F9FC] text-left dark:bg-dark-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleAddProduct} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Product
            </button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                Product ID
                </th>
                <th className="min-w-[180px] px-4 py-4 font-medium text-dark dark:text-white">
                  Title
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Price
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Description
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Category
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={index} className={`${index === currentProducts.length - 1 ? "border-b-0" : "border-b"} border-[#eee] px-4 py-4 dark:border-dark-3`}>
                  <td className="text-dark dark:text-white">
                    {product.id}
                  </td>
                  <td className="text-dark dark:text-white">
                    {product.title}
                  </td>
                  <td className="text-dark dark:text-white">
                    {product.price}
                  </td>
                  <td className="text-dark dark:text-white">
                    {product.description}
                  </td>
                  <td className="text-dark dark:text-white">
                    {product.category}
                  </td>
                  <td className="flex space-x-4 text-dark dark:text-white">
                    <button onClick={() => handleUpdate(product.id)} className="hover:text-blue-500">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="hover:text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={() => handleConsult(product.id)} className="hover:text-green-500">
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
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
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

export default ProductTablePage;
