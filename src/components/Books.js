import React from "react";
import { Grid } from "@material-ui/core";

import Book from "./Book";

export default ({ books }) => (
  <Grid container spacing={24}>
    {books.map((book, id) => (
      <Grid key={id} item xs={6} sm={3}>
        <Book book={book} />
      </Grid>
    ))}
  </Grid>
);
