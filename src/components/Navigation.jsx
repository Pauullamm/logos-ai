import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBooks } from "../data/api";
import { Menu, X } from 'lucide-react';


const Navigation = () => {
  const [books, setBooks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchBooks().then((data) => setBooks(data));
  }, []);

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden px-4 bg-[#B2C9AD] text-white fixed w-full flex justify-between items-center h-16 z-50">
        <div className="text-xl text-black font-bold">Logos AI</div>
        <button 
          className="p-2 hover:bg-[#66785F] duration-300 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`bg-[#B1C29E] p-6 pb-12 h-screen overflow-auto ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <h2 className="text-xl font-bold mb-4">Books</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-1">
          {books.map((book) => {
            // Get the first available chapter from chapterData keys
            const defaultChapter = Object.keys(book.chapterData)[0];
            return (
              <li key={book.bookId} className="flex items-center justify-center">
                <Link
                  to={`/book/${book.bookId}/chapter/${defaultChapter}`}
                  className="block w-full text-center p-2 border border-gray-400 bg-gray-100 rounded text-gray-800 hover:bg-gray-300 duration-200"
                  onClick={() => setSidebarOpen(false)} // Close sidebar on mobile selection
                >
                  {book.trunc}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navigation;