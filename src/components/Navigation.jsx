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
      <div className="md:hidden p-4 bg-gray-800 text-white fixed w-full flex justify-between items-center h-16">
        <div className="text-lg font-bold">RcV-Greek Reader</div>
        <button 
          className="p-2 hover:bg-gray-700 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`bg-gray-200 p-4 h-screen overflow-auto ${
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
                  className="block w-full text-center py-2 bg-white rounded text-gray-600 hover:bg-gray-100"
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