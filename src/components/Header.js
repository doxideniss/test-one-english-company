import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: 'space-between'
  },
  user: {
    display: 'flex'
  },
}));

const Header = ({title, logout, userAvatar}) => {
  const classes  = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div></div>
        <Typography variant="h6">
          {title}
        </Typography>
        <div className={classes.user}>
          <Avatar alt="user avatar" src={userAvatar} />
          <Button color="inherit" onClick={logout}>Logout</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
