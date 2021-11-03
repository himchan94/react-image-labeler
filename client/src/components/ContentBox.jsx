// Mui component

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

// styleSheet
import useStyles from "../css/useStyles.js";

// custom element
import Colorbox from "./element/Colorbox.jsx";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { removeLabel } from "../redux/modules/label.js";
import { removeImage } from "../redux/modules/image.js";
import { updateIndex } from "../redux/modules/current.js";
import { updateLabel } from "../redux/modules/current.js";

const ContentBox = ({ type, label, color, id }) => {
  const dispatch = useDispatch();
  const loaded_idx = useSelector((state) => state.current.index);
  const current_label = useSelector((state) => state.current.current_label);

  console.log("current_label", current_label);

  const classes = useStyles();

  if (type === "label") {
    return (
      <Card
        className={classes.cardcontent}
        style={
          id === current_label.id
            ? { backgroundColor: "red" }
            : { backgroundColor: "white" }
        }
        onClick={() => {
          dispatch(updateLabel({ name: label, color: color, id: id }));
        }}
      >
        <div>
          <Colorbox color={color} />
        </div>
        <div
          style={{
            maxWidth: "50%",
            overflowX: "hidden",
          }}
        >
          <Typography style={{ width: "150px" }} variant="h5">
            {label}
          </Typography>
        </div>
        <div
          style={{
            padding: "10px",
          }}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation(); // to prevent e bubbling
              dispatch(removeLabel(id));
              dispatch(updateLabel({ name: null, color: null, id: null }));
            }}
          >
            <DeleteIcon />
          </Button>
        </div>
      </Card>
    );
  } else {
    return (
      <Card className={classes.cardcontent}>
        <div
          style={{
            maxWidth: "70%",
            overflowX: "hidden",
          }}
        >
          <Typography
            style={{ width: "150px", textAlign: "center" }}
            variant="h6"
          >
            {label}
          </Typography>
        </div>
        <div>
          <Button
            style={{ color: "red" }}
            onClick={() => {
              dispatch(removeImage(id));

              if (loaded_idx - 1 >= 0) {
                dispatch(updateIndex(loaded_idx - 1));
              } else {
                dispatch(updateIndex(0));
              }
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </Card>
    );
  }
};

export default ContentBox;
