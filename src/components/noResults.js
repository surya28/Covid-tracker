import React from "react";
import NoResults from "../assets/No-results.png";

const NoResult = () => {
  return (
    <img
      src={NoResults}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    />
  );
};

export default NoResult;
