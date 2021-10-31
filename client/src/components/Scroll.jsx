import * as React from "react";

// Mui component
import Box from "@mui/material/Box";

//component
import ContentBox from "./ContentBox.jsx";

//redux
import { useSelector } from "react-redux";

const Scroll = ({ type }) => {
  const labelState = useSelector((state) => state.label);
  const imageState = useSelector((state) => state.image);

  if (type === "label") {
    if (labelState.label.length === 0) {
      return (
        <>
          <h4>Add your {type}</h4>
        </>
      );
    }
    return (
      <Box
        component="div"
        sx={{ maxHeight: "250px", width: "auto", overflowY: "auto" }}
      >
        {labelState.label.map((lb, idx) => {
          return (
            <ContentBox
              key={idx}
              type={"label"}
              id={lb.id}
              label={lb.label}
              color={lb.color}
            />
          );
        })}
      </Box>
    );
  }

  if (type === "files") {
    if (imageState.image.length === 0) {
      return (
        <>
          <h4>Add your {type}</h4>
        </>
      );
    }

    return (
      <Box
        component="div"
        sx={{ maxHeight: "250px", width: "auto", overflowY: "auto" }}
      >
        {imageState.image.map((img, idx) => {
          return (
            <ContentBox
              key={idx}
              type={"image"}
              id={img.id}
              label={img.file.name}
            />
          );
        })}
      </Box>
    );
  }
};

export default Scroll;
