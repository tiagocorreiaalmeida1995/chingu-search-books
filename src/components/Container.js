import React from "react";

export default ({ children }) => (
  <div style={styles.containerStyle} className="container">
    {children}
  </div>
);

const styles = {
  containerStyle: {
    maxWidth: "1240px",
    display: "block",
    margin: "auto"
  }
};
