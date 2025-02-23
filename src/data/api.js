import { books } from "./booksExample";
// import { books } from "./books";


export function fetchBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convert the books object into an array for easier mapping
      resolve(Object.values(books));
    }); // simulate network delay
  });
}

export function fetchBookChapter(bookId, chapterId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books[bookId];
      if (!book) {
        return reject("Book not found");
      }
      const chapter = book.chapterData[chapterId];
      if (!chapter) {
        return reject("Chapter not found");
      }
      resolve({ book, chapter });
    }); // simulate network delay
  });
}
