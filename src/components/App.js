import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";

import { getBooksByTerm } from "../utils/googleBooks";
import Message from "./Message";
import Books from "./Books";
import Container from "./Container";

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [lastSearchInputValue, setLastSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const onSearchBook = async e => {
    e.preventDefault();
    if (searchInputValue !== lastSearchInputValue && searchInputValue !== "") {
      setErrorMessage("");
      setIsLoading(true);
      setLastSearchInput(searchInputValue);

      try {
        const books = await getBooksByTerm(searchInputValue);
        setBooks(books);
      } catch (e) {
        setErrorMessage("Unable to make the request, please try again later");
      }

      setIsLoading(false);
    }
  };

  const displayBooks = books => {
    if (books !== undefined) {
      return books.length > 0 ? (
        <Books books={books} />
      ) : (
        <Message type="info" message="No books found matching your search." />
      );
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom align="center">
        Book Finder
      </Typography>
      <Container>
        <form onSubmit={onSearchBook} style={styles.searchContainerStyles}>
          <TextField
            id="outlined-bare"
            margin="normal"
            variant="outlined"
            value={searchInputValue}
            onChange={e => setSearchInputValue(e.target.value)}
            placeholder="Search by book title or autor"
          />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            margin="normal"
          >
            Search
          </Button>
        </form>
        {isLoading && <CircularProgress style={styles.loaderStyles} />}
        {errorMessage ? (
          <Message type="error" message={errorMessage} />
        ) : (
          displayBooks(books)
        )}
      </Container>
    </div>
  );
};

const styles = {
  searchContainerStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loaderStyles: {
    display: "block",
    margin: "15px auto",
    width: "50px",
    height: "50px"
  }
};

export default App;
