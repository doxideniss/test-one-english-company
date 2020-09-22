import React from 'react';
import { Paper, TextField, FormHelperText, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import { validate } from "../utils";

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px',
  },
  input: {
    marginBottom: '20px'
  }
}));

const LoginPage = ({ dispatch }) => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [touched, setTouched] = React.useState({
    email: false,
    password: false
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    form: ''
  });

  React.useEffect(() => {
    validate({
      email,
      password
    }, (err) => setErrors(err));
  }, [email, password]);

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value)
    }
  };
  const handleBlur = (name) => () => {
    setTouched({
      ...touched,
      [name]: true,
    })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@admin.net' && password === 'admin') {
      dispatch({
        type: 'LOGIN',
        payload: {
          email,
          avatar: 'https://static.tildacdn.com/tild6664-3239-4737-b261-323064633836/new_logo.png'
        }
      });
      history.push('/page1')
    } else {
      setTouched({
        email: true,
        password: true,
      });
      validate({
        email,
        password
      }, (err) => setErrors(err));
      setErrors({
        ...errors,
        form: 'Неправильный логин или пароль'
      });
      setTimeout(() => {
        setErrors({
          ...errors,
          form: ''
        });
      }, 5000)
    }
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography component="h1" variant="h5">
        Войдите
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField fullWidth
                   className={classes.input}
                   required
                   id="email"
                   type="email"
                   label="Email"
                   value={email}
                   onChange={handleChange('email')}
                   onBlur={handleBlur('email')}
                   error={touched.email && !!errors.email}
                   helperText={touched.email && errors.email}
        />
        <TextField fullWidth
                   className={classes.input}
                   required
                   id="password"
                   type="password"
                   label="Пароль"
                   value={password}
                   onChange={handleChange('password')}
                   onBlur={handleBlur('password')}
                   error={touched.password && !!errors.password}
                   helperText={touched.password && errors.password}
        />
        {errors.form && (
          <FormHelperText error={true}>
            {errors.form}
          </FormHelperText>
        )}
        <Button
          variant="outlined"
          type="submit"
          fullWidth
          color="primary"
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};

export default LoginPage;
