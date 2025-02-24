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
        <div className="flex h-screen bg-[#F0F0D7]">
          <Navigation />

          {/* Content area where routes will render */}
          <div className="flex-1 overflow-auto pt-16 md:pt-0">
            <Routes>
              <Route
                path="/book/:bookId/chapter/:chapterId"
                element={<Reader />}
              />
              <Route
                path="*"
                element={
                <div className="h-full flex justify-center items-center">
                  <h1 className="place-self-center">
                    Select a book from the navigation.
                  </h1>
                </div>
                }
              />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </WordInspectorProvider>
  );
}
export default App;
