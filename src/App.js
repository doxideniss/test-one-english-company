import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import reducer from "./reducer";
import { Menu, Header } from "./components";
import { LoginPage, Page1, Page2, Page3 } from './pages'
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import db from "./db";

const useStyle = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    height: '100%'
  },
  loginContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  }
}));

function App() {
  const classes = useStyle();
  const [state, dispatch] = React.useReducer(reducer, {
    user: {
      email: '',
      avatar: '',
    },
    isAuth: false,
    titlePage: '',
    checkedId: [],
    users: [],
    currentUser: {
      firstName: '',
      lastName: '',
      tel: [''],
      email: [''],
    }
  });

  React.useEffect(() => {
    if (!db) {
      alert("Failed to connect to database.");
    }
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Users',
        [],
        (_, result) => {
          dispatch({
            type: 'SET_USERS',
            payload: [...result.rows]
          })
        },
        (tx, error) => {
          tx.executeSql('CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, tel TEXT, email TEXT)');
        })
    });
  }, []);

  if (!state.isAuth) {
    return (
      <div className={classes.loginContainer}>
        <LoginPage dispatch={dispatch}/>
      </div>
    )
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    })
  };

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Header title={state.titlePage} logout={logout} userAvatar={state.user.avatar}/>
      <div className={classes.container}>
        <Menu/>
        <Switch>
          <Route path="/page1">
            <Page1 dispatch={dispatch} selectedItems={state.checkedId}/>
          </Route>
          <Route path="/page2">
            <Page2 dispatch={dispatch} selectedItems={state.checkedId} />
          </Route>
          <Route path="/page3">
            <Page3 dispatch={dispatch} listUsers={state.users} currentUser={state.currentUser} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
