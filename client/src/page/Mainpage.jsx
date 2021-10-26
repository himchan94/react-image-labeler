import { useState, useRef } from "react";

import ImageBox from "../components/ImageBox";
import SideBar from "../components/SideBar";

import useStyles from "../css/useStyles.js";

const Mainpage = () => {
  const [files, setFiles] = useState([]);

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <SideBar files={files} setFiles={setFiles} />
      <ImageBox files={files} />
    </div>
  );
};

export default Mainpage;
