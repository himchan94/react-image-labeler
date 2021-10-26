import { useEffect, useState } from "react";
import useStyles from "../css/useStyles.js";

import { useDispatch, useSelector } from "react-redux";

const ImageShow = () => {
  const classes = useStyles();
  const loaded_image = useSelector((state) => state.image);

  console.log(loaded_image);
  if (loaded_image.length === 0) {
    return <h1>Upload your dicom image</h1>;
  } else {
    console.log(loaded_image[0]);
    return <h1>"file exist"</h1>;
  }
};

export default ImageShow;
