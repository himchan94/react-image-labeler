import { useRef, useState } from "react";

// Mui component
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@material-ui/core";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useStyles from "../css/useStyles.js";
import { ListItemButton } from "@mui/material";

// Component
import Scroll from "./Scroll";

// styleSheet
import { styled } from "@mui/material/styles";

// ID generator
import uuidv4 from "../script/id_generator.js";

// Redux
import { useDispatch } from "react-redux";
import { createImage } from "../redux/modules/image.js";

const Input = styled("input")({
  display: "none",
});
const ImageAdd = ({}) => {
  const dispatch = useDispatch();
  const fileInput = useRef();
  const classes = useStyles();

  const addFile = (e) => {
    const files = [...e.target.files];
    const formatted_files = files.map((file) => {
      const id = uuidv4();
      return { id: id, file };
    });
    console.log("포맷티드 파일", formatted_files);
    dispatch(createImage(formatted_files));
  };

  return (
    <>
      <label htmlFor="contained-button-file">
        <List className={classes.sideComponnent}>
          <ListItem
            sx={{ bgcolor: "#F8F8FF", borderRadius: "10px" }}
            disablePadding
          >
            <ListItemButton>
              <Input
                accept="*"
                id="contained-button-file"
                multiple
                type="file"
                ref={fileInput}
                onChange={addFile}
              />

              <ListItemIcon>
                <AddPhotoAlternateIcon fontSize="large" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Add Image" />
            </ListItemButton>
          </ListItem>
        </List>
      </label>
      <Scroll type={"files"} />
    </>
  );
};

export default ImageAdd;
