import useStyles from "../../css/useStyles";

const Colorbox = ({ color }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        backgroundColor: `${color}`,
        marginRight: "10px",
        marginLeft: "10px",
      }}
    ></div>
  );
};

export default Colorbox;
