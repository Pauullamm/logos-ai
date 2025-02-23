import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Reader from "./components/Reader";
import { WordInspectorProvider } from "./components/inspector/WordInspectorContext";

function App() {
  return (
    <WordInspectorProvider>
      <HashRouter>
        {/* Main container wrapping both Navigation and Content */}
        <div className="flex h-screen">
          <Navigation />
          
          {/* Content area where routes will render */}
          <div className="flex-1 overflow-auto p-4">
            <Routes>
              <Route
                path="/book/:bookId/chapter/:chapterId"
                element={<Reader />}
              />
              <Route
                path="*"
                element={<div>Select a book from the navigation.</div>}
              />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </WordInspectorProvider>
  );
}
export default App;
