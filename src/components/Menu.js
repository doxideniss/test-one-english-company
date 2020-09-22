import React from 'react';
import {Paper, MenuList, MenuItem} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
    width: '200px',
  },
}));

const Menu = () => {
  const classes = useStyle();

  return (
    <Paper className={classes.root}>
      <MenuList>
        <MenuItem component={Link}
                  to="/page1">
          Страница 1
        </MenuItem>
        <MenuItem component={Link}
                  to="/page2">
          Страница 2
        </MenuItem>
        <MenuItem component={Link}
                  to="/page3">
          Страница 3
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default Menu;
