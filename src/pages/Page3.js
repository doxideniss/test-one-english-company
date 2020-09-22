import React from 'react';
import { Box, AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import db from '../db';
import { ListUsers, UserForm } from "../components";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const Page3 = ({ dispatch, listUsers, currentUser }) => {
  const classes = useStyles();
  const [indexTab, setIndexTab] = React.useState(0);

  React.useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: 'Страница 3'
    })
  }, []);

  const handleChangeTab = (event, newValue) => {
    setIndexTab(newValue);
  };

  const handleUpdateUser = (user) => (e) => {
    dispatch({
      type: 'SET_CURRENT_USER',
      payload: user
    });
    setIndexTab(0);
  };

  const updateUser = (user, callback) => {
    db.transaction((tx) => {
      tx.executeSql('UPDATE Users SET firstName=?, lastName=?, tel=?, email=? WHERE id=?',
        [user.firstName, user.lastName, user.tel.join(', '), user.email.join(', '), user.id], (tx, result) => {
          dispatch({
            type: 'UPDATE_USER',
            payload: user
          });
          callback(true);
        },
        (tx, err) => {
          callback(false);
          console.log('Не удалось обновить этого пользователя', err)
        });
    });
  };

  const saveUser = (values, callback) => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO Users (firstName, lastName, tel, email) values(?, ?, ?, ?)',
        [values.firstName, values.lastName, values.tel.join(', '), values.email.join(', ')],
        (tx, result) => {
          dispatch({
            type: 'ADD_USER',
            payload: {
              ...values
            }
          });
          callback(true);
        },
        (tx, error) => {
          callback(false);
          alert('Ошибка записи');
        });
    });
  };

  const deleteUser = (id) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM Users WHERE id = ?', [id], (tx, result) => {
          dispatch({
            type: 'DELETE_USER',
            payload: id
          })
        },
        (tx, err) => {
          console.log('Не удалось удалить этого пользователя', err)
        });
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={indexTab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Добавить"/>
          <Tab label="Список"/>
        </Tabs>
      </AppBar>
      <TabPanel value={indexTab} index={0}>
        <UserForm saveUser={saveUser} updateUser={updateUser} currentUser={currentUser}/>
      </TabPanel>
      <TabPanel value={indexTab} index={1}>
        <ListUsers handleUpdateUser={handleUpdateUser} deleteUser={deleteUser} listUsers={listUsers}/>
      </TabPanel>
    </div>
  );
};

export default Page3;
