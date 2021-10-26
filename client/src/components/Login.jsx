import React from "react";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LogOutlinedIcon from "@material-ui/icons/LockOutlined";

const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 280,
  margin: "20px auto",
};
const avatarStyle = {
  backgroundColor: "#150b41",
};
const btnStyle = {
  margin: "8px 0",
};

const Login = () => {
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LogOutlinedIcon />
          </Avatar>
          <h2> Sign in</h2>
        </Grid>
        <TextField
          lable="Username"
          placeholder="Enter username"
          fullWidth
          required
        ></TextField>
        <TextField
          lable="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        ></TextField>

        <FormControlLabel control={<Checkbox check />} label="Remeber me" />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={btnStyle}
        >
          Sign in
        </Button>
        <Typography>
          <Link href="#"> Forgot password?</Link>
        </Typography>
        <Typography>
          Do you have an account?
          <Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
