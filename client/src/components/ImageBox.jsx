import { useEffect, useState } from "react";

// Mui component
import { Paper } from "@material-ui/core";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//styleSheet
import useStyles from "../css/useStyles.js";

//component
import ImageShow from "./ImageShow.jsx";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateIndex } from "../redux/modules/current.js";

const ImageBox = () => {
  const dispatch = useDispatch();
  const idx = useSelector((state) => state.current);
  const loaded_image = useSelector((state) => state.image);

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
            <button
              className="prev"
              onClick={(e) => {
                let newIndex = idx.index - 1;

                if (newIndex < 0) {
                  if (loaded_image.image.length !== 0) {
                    newIndex = loaded_image.image.length - 1;
                    dispatch(updateIndex(newIndex));
                  } else {
                    newIndex = 0;
                    dispatch(updateIndex(newIndex));
                  }
                }

                dispatch(updateIndex(newIndex));
              }}
            >
              <ArrowBackIosIcon sx={{ fontSize: 40 }} />
            </button>
            <button
              className="next"
              onClick={(e) => {
                let newIndex = idx.index + 1;

                if (newIndex > loaded_image.image.length - 1) {
                  newIndex = 0;
                  dispatch(updateIndex(newIndex));
                }

                dispatch(updateIndex(newIndex));
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </button>
          </>
        ) : null}
      </Paper>
    </div>
  );
};

export default ImageBox;
