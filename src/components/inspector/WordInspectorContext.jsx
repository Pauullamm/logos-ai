// WordInspectorContext.js (updated)
import React, { createContext, useState, useContext } from 'react';

const WordInspectorContext = createContext();

export const useWordInspector = () => useContext(WordInspectorContext);

export const WordInspectorProvider = ({ children }) => {
  const [isInspectionActive, setInspectionActive] = useState(false);
  const [wordDetails, setWordDetails] = useState(null);

  const inspectWord = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/api/analyse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ''
        },
        body: JSON.stringify({
          bookTitle: data.bookTitle,
          chapterNum: data.chapterNum,
          verseNum: data.verseNum,
          english: data.english,
          greek: data.greek,
          highlightedWord: data.highlightedWord
        }),
      });
      if (!response.ok) throw new Error('Failed to fetch word details');
      const result = await response.json();
      setWordDetails(result);
    } catch (error) {
      console.error('Error inspecting word:', error);
      setWordDetails({ error: error.message });
    }
  };

  return (
    <WordInspectorContext.Provider value={{
      isInspectionActive,
      setInspectionActive,
      inspectWord,
      wordDetails,
      setWordDetails,
    }}>
      {children}
    </WordInspectorContext.Provider>
  );
};