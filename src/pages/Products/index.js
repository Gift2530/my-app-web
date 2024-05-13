import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/Product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="px-4 py-2">รหัสสินค้า</th>
            <th className="px-4 py-2">ชื่อสินค้า</th>
            <th className="px-4 py-2">จำนวนสินค้าคงเหลือ</th>
            <th className="px-4 py-2">ราคาขายต่อหน่วย</th>
            {/* <th className="px-4 py-2">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.pid} className="border hover:bg-gray-100">
              <td className="px-4 py-2 text-center">{product.pid}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2 text-center">{product.qty}</td>
              <td className="px-4 py-2 text-center">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4"></div>
      <div className="mt-4">
        <Link href={`/ShoppingCarts`} passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            แก้ไขจำนวนสั่งซื้อ
          </button>
        </Link>
        <Link href={`/home`} passHref>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
            สั่งซื้อจำนวนสินค้าทั้งหมด
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

