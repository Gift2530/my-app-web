import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto ">
      <nav className="py-4 bg-gray-800 text-white px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Products Management System</h1>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <div className="text-gray-300 hover:text-white">Home</div>
              </Link>
            </li>
            <li>
              <Link href="/Products">
                <div className="text-gray-300 hover:text-white">Products</div>
              </Link>
            </li>
            {/* Add more navbar links as needed */}
          </ul>
        </div>
      </nav>
      <main className="py-8">{children}</main>
      <footer className="py-4 text-center text-gray-500">
        &copy; 2024 Products Management System
      </footer>
    </div>
  );
};

export default Layout;
