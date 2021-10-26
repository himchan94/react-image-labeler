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
  },
  page: {
    flex: "4",
    display: "flex",
  },
  imagepage: {
    flexGrow: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    width: "40%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  rightbtn: {
    marginRight: "10px",
  },
}));

export default useStyles;
