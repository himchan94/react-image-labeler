import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import useStyles from "../css/useStyles.js";

const Scroll = ({ files = [], type, label = [] }) => {
  const classes = useStyles();

  if (files.length === 0) {
    return (
      <>
        <h4>Add your {type}</h4>
      </>
    );
  }

  if (type === "files") {
    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "#D3D3D3",
          position: "relative",
          overflow: "auto",
          maxHeight: 200,
          marginTop: "15px",
        }}
      >
        {files.map((file, idx) => {
          return (
            <li className={classes.list} key={idx}>
              <ul>
                <ListItem key={idx}>
                  <ListItemText primary={`${file.name}`} />
                </ListItem>
              </ul>
            </li>
          );
        })}
      </List>
    );
  }
};

export default Scroll;
