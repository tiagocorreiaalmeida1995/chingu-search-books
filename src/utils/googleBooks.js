import GoogleBooks from "google-books-search";
import util from "util";

const searchBooks = util.promisify(GoogleBooks.search);
const googleBooksOptions = {
  field: "title",
  limit: 16,
  type: "books",
  order: "relevance",
  lang: "en"
};

const getBooksByTerm = async term => {
  const books = await searchBooks(term, googleBooksOptions);
  return books;
};

export { getBooksByTerm };
