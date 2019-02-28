import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions
} from "@material-ui/core";

import { getBooksByTerm } from "../utils/googleBooks";

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isLoading, setIsLoadingValue] = useState(false);
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const onSearchBook = async e => {
    e.preventDefault();

    try {
      const books = await getBooksByTerm(searchInputValue);
      console.log(books[0]);
      setBooks(books);
    } catch (e) {
      setErrorMessage("Unable to make the request, please try again later");
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom align="center">
        Book Finder
      </Typography>
      <form onSubmit={onSearchBook}>
        <TextField
          id="outlined-bare"
          margin="normal"
          variant="outlined"
          value={searchInputValue}
          onChange={e => setSearchInputValue(e.target.value)}
          placeholder="Search by book title or autor"
        />
        <Button variant="contained" color="secondary">
          Search
        </Button>
        {books.length > 0 && (
          <Grid container spacing={24}>
            {books.map((book, id) => (
              <Grid key={id} item xs={6} sm={3}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      image={book.thumbnail}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {book.title}
                      </Typography>
                      <Typography component="p">
                        {book.authors && book.authors.join(", ")}
                      </Typography>
                      <Typography component="p">
                        {book.publisher} - {book.publishedDate}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </form>
    </div>
  );
};

export default App;
