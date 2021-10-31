import { useState } from "react";

// MUI component
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ListItemButton } from "@mui/material";

//JSX Component
import Scroll from "./Scroll";
import Modalpage from "./Modalpage.jsx";

// styleSheet
import useStyles from "../css/useStyles.js";

const LabelAdd = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <List>
        <ListItem className={classes.sideComponnent} disablePadding>
          <ListItemButton
            sx={{ bgcolor: "#F8F8FF", borderRadius: "10px" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <ListItemIcon>
              <AddBoxIcon fontSize="large" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Label"></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Scroll type={"label"} />
      <Modalpage open={open} setOpen={setOpen} />
    </>
  );
};

export default LabelAdd;
