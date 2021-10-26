import { Paper } from "@material-ui/core";

import ImageShow from "./ImageShow.jsx";

import useStyles from "../css/useStyles.js";

const ImageBox = () => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Paper className={classes.imagepage} elevation={10}>
        <ImageShow />
      </Paper>
    </div>
  );
};

export default ImageBox;
