import React from "react";
import { SnackbarContent, Icon } from "@material-ui/core";

export default ({ type, message }) => (
  <SnackbarContent
    message={
      <span id="client-snackbar">
        <Icon className="" />
        {message}
      </span>
    }
  />
);
