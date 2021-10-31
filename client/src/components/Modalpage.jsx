import { useState, useRef } from "react";

// Mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

// stylesheets
import useStyles from "../css/useStyles.js";

// ID generator
import uuidv4 from "../script/id_generator.js";

// Redux
import { useDispatch } from "react-redux";
import { createLabel } from "../redux/modules/label";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontSize: "16px",
  textAlign: "center",
  padding: "1.5%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const Modalpage = ({ open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [color, setColor] = useState("#e66465");
  const [label, setLabel] = useState(null);

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <h1>Create your Label</h1>
            <div className={classes.modalbox}>
              <div className={classes.input}>
                <TextField
                  style={{ width: "70%" }}
                  label="Enter the label name"
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
                <div>
                  <label htmlFor="head">pick label color</label>
                </div>
                <div>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setColor(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={classes.btncontainer}>
              <Button
                className={classes.rightbtn}
                variant="contained"
                startIcon={<SaveIcon />}
                color="success"
                onClick={() => {
                  const id = uuidv4();
                  const object = {
                    id: id,
                    label: label,
                    color: color,
                  };
                  dispatch(createLabel(object));
                  setOpen(false);
                }}
              >
                Save
              </Button>
              <Button
                className={classes.leftbtn}
                variant="contained"
                onClick={() => {
                  setOpen(false);
                }}
                endIcon={<CancelIcon />}
                color="error"
              >
                Cancel
              </Button>
            </div>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default Modalpage;
