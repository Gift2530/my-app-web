import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";

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

  const [messages, setMessages] = useState("");
  const addToCart = async (product, index, reserve) => {
    console.warn("reserve :>> ", reserve);
    if (reserve == 0) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [index]: "กรุณาระบุจำนวนสินค้าด้วยค่ะ",
      }));
      return;
    }
    setCart([...cart, { ...product, reserve }]);
    try {
      product.reserve = reserve;
      const response = await axios.put(
        `http://localhost:5050/api/ShoppingCart/${product.pid}`,
        product
      );
      console.log("Data saved:", product);
      Router.push("/Products");
    } catch (error) {
      console.warn("aaa :>> ", error.response.data);

      if (error.response.data.status == 404) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [index]: "จำนวนสินค้าไม่เพียงพอค่ะ",
        }));
      }

      console.error("Error saving data:", error);
    }
  };

  const clearItem = async (pid) => {
    console.warn("object :>> ", pid);
    try {
      const response = await axios.put(
        `http://localhost:5050/api/Product/${pid}/status`
      );
      console.warn("object :>> ", response.data);
      Router.push("/Products");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const clearAll = async () => {
    setCart([]);
    try {
      const response = await axios.put(
        `http://localhost:5050/api/Product/status-all`
      );
      console.warn("object :>> ", response.data);
      Router.push("/");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  //   const [reserve, setReserve] = useState(0);
  const handleChange = (product, index, e) => {
    // const value = e.target.value;
    product.reserve = e;
    // setReserve(value);
    setMessages("");
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="px-4 py-2">รหัสสินค้า</th>
            <th className="px-4 py-2">ชื่อสินค้า</th>
            <th className="px-4 py-2">จำนวนสินค้าคงเหลือ</th>
            <th className="px-4 py-2">ราคาขายต่อหน่วย</th>
            <th className="px-4 py-2">จำนวนสั่งซื้อ</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border hover:bg-gray-100">
              <td className="px-4 py-2 text-center">{product.pid}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2 text-center">{product.qty}</td>
              <td className="px-4 py-2 text-center">{product.price}</td>
              <td className="px-4 py-2 text-center">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="reserve"
                  type="number"
                  name="reserve"
                  //   value={product.reserve}
                  onChange={(e) => handleChange(product, index, e.target.value)}
                />
                {messages[index] && <div className="text-red-500 text-xs italic" key={index}>{messages[index]}</div>}
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addToCart(product, index, product.reserve)}
                >
                  บันทึก
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => clearItem(product.pid)}
                >
                  ลบรายการสินค้า
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={clearAll}
        >
          ล้างรายการทั้งหมด
        </button>
      </div>
    </div>
  );
};

export default Home;
