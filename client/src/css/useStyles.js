import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  sidebar: {
    flex: "1",
    backgroundColor: "#BEBEBE",
    padding: "15px",
    maxWidth: "300px",
  },
  page: {
    flex: "4",
    display: "flex",
    position: "relative",
  },
  imagepage: {
    flexGrow: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  },
  imageinput: {
    display: "none",
  },

  sideComponnent: {
    marginTop: "10px",
  },

  modalbox: {
    marginTop: "10%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  input: {
    display: "flex",
    alignItems: "center",
  },
  btncontainer: {
    marginTop: "10%",
    width: "70%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  rightbtn: {
    marginRight: "1rem",
    padding: "20px",
  },
  leftbtn: {
    padding: "20px",
  },
  cardcontent: {
    marginTop: "10px",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexFlow: "no-wrap",
    justifyContent: "space-evenly",
  },
}));

export default useStyles;
