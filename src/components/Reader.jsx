import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBookChapter, fetchNoteData } from "../data/api";
import { Volume2 } from "lucide-react";
import GreekWord from "./GreekWord";
import WordInspector from "./inspector/WordInspector";
import Note from "./Note";


const Reader = () => {
  const { bookId, chapterId } = useParams();
  const [data, setData] = useState({ book: null, chapter: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchBookChapter(bookId, chapterId)
      .then(({ book, chapter }) => {
        setData({ book, chapter });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [bookId, chapterId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error: {error}</div>;

  const { book, chapter } = data;
  const chapterKeys = Object.keys(book.chapterData);

  const handleReadAloud = async (text) => {
    try {
      const response = await fetch("https://logos-ai-sub.koyeb.app/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to fetch audio");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);

      audioElement.play();
      setAudio(audioElement);

      audioElement.onended = () => setAudio(null);
    } catch (err) {
      console.error("Error fetching TTS audio:", err);
      alert("Failed to play audio. Please try again later.");
    }
  };


  return (
    <main className="flex h-screen">
      <div className="flex md:flex-row flex-1 overflow-hidden">
        {/* Main Reader Section */}
        <div className="flex-1 bg-[#F0F0D7] p-4 overflow-x-auto min-w-0">
          <h2 className="text-2xl font-bold mb-4">
            {book.title} - Chapter {chapterId}
          </h2>
          {/* Chapter Navigation Bar */}
          <div className="py-3 flex space-x-2 overflow-x-auto">
            {chapterKeys.map((key) => (
              <Link
                key={key}
                to={`/book/${book.bookId}/chapter/${key}`}
                className={`px-3 py-1 border rounded whitespace-nowrap ${key === chapterId
                  ? "bg-[#B2C9AD] text-black"
                  : "bg-white text-black hover:bg-[#91AC8F] duration-200"
                  }`}
              >
                {key}
              </Link>
            ))}
          </div>
          {/* Verses */}
          <div className="space-y-2">
            {chapter.map((verse) => (
              <div key={verse.verseNum} className="p-4 border-b break-words">
                <p className="font-medium">Verse {verse.verseNum}</p>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {verse.greek.split(" ").map((word, index) => (
                      <GreekWord
                        key={index}
                        word={word}
                        greekText={verse.greek}
                        englishText={verse.english}
                        bookTitle={book.title}
                        chapterNum={chapterId}
                        verseNum={verse.verseNum}
                      />
                    ))}
                    <button
                      onClick={() => handleReadAloud(verse.greek)}
                      className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer opacity-80"
                    >
                      <Volume2 size={16} />
                    </button>
                    {/*Add notes to the verse */}
                    <Note
                      bookInfo={bookId}
                      chapterId={chapterId}
                      verseId={verse.verseNum}
                    />
                  </div>
                  <p className="text-base text-gray-700 mt-2 whitespace-normal">
                    {verse.english}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Word Inspector Section */}
        <WordInspector />
      </div>
    </main>
  );
};

export default Reader;
