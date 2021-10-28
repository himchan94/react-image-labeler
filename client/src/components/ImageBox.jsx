import { useEffect, useState } from "react";

import { Paper } from "@material-ui/core";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import ImageShow from "./ImageShow.jsx";

import useStyles from "../css/useStyles.js";

const ImageBox = () => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const element = document.getElementById("container");

    const hoverIn = () => {
      setHover(true);
    };

    const hoverOut = () => {
      setHover(false);
    };

    element.addEventListener("mouseenter", hoverIn);
    element.addEventListener("mouseleave", hoverOut);

    return () => {
      element.removeEventListener("mouseenter", hoverIn);
      element.removeEventListener("mouseleave", hoverOut);
    };
  });

  return (
    <div id="container" className={classes.page}>
      <Paper className={classes.imagepage} elevation={10}>
        <ImageShow />

        {hover ? (
          <>
            <button className="prev">
              <ArrowBackIosIcon sx={{ fontSize: 40 }} />
            </button>
            <button className="next">
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </button>
          </>
        ) : null}
      </Paper>
    </div>
  );
};

export default ImageBox;
