import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from "@material-ui/core";

export default ({ book }) => (
  <Card>
    <CardMedia src={book.thumbnail} title="Contemplative Reptile" />
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
    <CardActions>
      <Button size="small" color="primary">
        See more
      </Button>
    </CardActions>
  </Card>
);
