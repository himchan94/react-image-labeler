import * as React from "react";

// Mui component
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

// styleSheet
import useStyles from "../css/useStyles.js";

//component
import ContentBox from "./ContentBox.jsx";

//redux
import { useDispatch, useSelector } from "react-redux";

const Scroll = ({ type }) => {
  const classes = useStyles();
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
            <>
              <ContentBox
                type={"label"}
                key={idx}
                id={lb.id}
                label={lb.label}
                color={lb.color}
              />
            </>
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
            <>
              <ContentBox
                type={"image"}
                key={idx}
                id={img.id}
                label={img.file.name}
              />
            </>
          );
        })}
      </Box>
    );
  }
};

export default Scroll;
