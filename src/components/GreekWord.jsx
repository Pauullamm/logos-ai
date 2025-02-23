// GreekWord.js (updated)
import React from 'react';
import { useWordInspector } from './inspector/WordInspectorContext';

const GreekWord = ({ word, greekText, englishText, bookTitle, chapterNum, verseNum }) => {
  const { isInspectionActive, inspectWord } = useWordInspector();

  const handleClick = () => {
    if (isInspectionActive) {
      inspectWord({
        bookTitle,
        chapterNum: parseInt(chapterNum),
        verseNum: verseNum,
        english: englishText,
        greek: greekText,
        highlightedWord: word
      });
    }
  };

  return (
    <span
      onClick={handleClick}
      className={`${isInspectionActive ? 'hover:text-blue-500 cursor-pointer' : ''} alpheios-enabled`}
      lang="grc"
    >
      {word}
    </span>
  );
};

export default GreekWord;