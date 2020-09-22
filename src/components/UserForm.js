import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Button, FormHelperText, IconButton, TextField } from "@material-ui/core";
import ControlPointIcon from '@material-ui/icons/ControlPoint';

import { validate } from "../utils";

const useStyle = makeStyles(() => ({
  formBox: {
    display: 'flex'
  },
  formGroup: {
    display: 'flex',
    alignSelf: 'flex-start',
    marginRight: '20px'
  },
  formBoxInputs: {
    display: 'flex',
    flexDirection: 'column'
  },
  formAddBtn: {
    alignSelf: 'flex-end'
  },
  input: {
    marginBottom: '20px',
  },
  inputFirstName: {
    marginRight: '20px'
  }
}));

const UserForm = ({saveUser, updateUser, currentUser}) => {
  const classes = useStyle();

  const [count, setCount] = React.useState({
    tel: currentUser.tel ? currentUser.tel.length : 1,
    email: currentUser.email ? currentUser.email.length : 1
  });
  const [values, setValues] = React.useState(currentUser || {
    firstName: '',
    lastName: '',
    tel: [],
    email: []
  });
  const [touched, setTouched] = React.useState({
    firstName: false,
    lastName: false,
    tel: [false],
    email: [false]
  });
  const [errors, setErrors] = React.useState({
    firstName: '',
    lastName: '',
    tel: [''],
    email: [''],
    form: ''
  });

  React.useEffect(() => {
    validate({
      ...values
    }, (err) => setErrors(err));
  }, [values]);

  const clearForm = () => {
    setCount({
      tel: 1,
      email: 1
    });
    setValues({
      firstName: '',
      lastName: '',
      tel: [''],
      email: ['']
    });
  };
  const handleChange = (name) => (e) => {
    if (name === 'tel' || name === 'email') {
      const idItem = e.target.id.replace(name, '');
      values[name][idItem] = e.target.value;
      setValues({
        ...values,
        [name]: [...values[name]]
      })
    } else {
      setValues({
        ...values,
        [name]: e.target.value
      })
    }
  };
  const handleBlur = (name) => (e) => {
    if (name === 'tel' || name === 'email') {
      const idItem = e.target.id.replace(name, '');
      touched[name][idItem] = true;
      setTouched({
        ...touched,
        [name]: [...touched[name]]
      })
    } else {
      setTouched({
        ...touched,
        [name]: true,
      })
    }
  };
  const handleAddField = (name) => () => {
    setCount(prevState => ({
      ...prevState,
      [name]: prevState[name] + 1
    }))
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      ...touched,
      firstName: true,
      lastName: true,
    });
    validate({
      ...values
    }, (err) => {
      let formValid = '';
      if (!!err.firstName || !!err.lastName) {
        formValid = 'Неверно заполненна форма'
      }

      setErrors({
        ...err,
        form: formValid
      });

      if (formValid === '') {
        setErrors({
          firstName: '',
          lastName: '',
          tel: [''],
          email: [''],
          form: ''
        });
        setTouched({
          firstName: false,
          lastName: false,
          tel: [false],
          email: [false]
        });
        if (values['id']) {
          updateUser(values, (res) => {
            if (res) {
              clearForm();
              alert('Успешно')
            }
          });
        } else {
          saveUser(values, (res) => {
            if (res) {
              clearForm();
              alert('Успешно')
            }
          })
        }
      }
    });

  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        className={`${classes.input} ${classes.inputFirstName}`}
        label="Имя"
        type="text"
        onBlur={handleBlur('firstName')}
        onChange={handleChange('firstName')}
        value={values.firstName}
        error={touched.firstName && !!errors.firstName}
        helperText={touched.firstName && errors.firstName}
      />
      <TextField
        className={classes.input}
        label="Фамилия"
        type="text"
        onBlur={handleBlur('lastName')}
        onChange={handleChange('lastName')}
        value={values.lastName}
        error={touched.lastName && !!errors.lastName}
        helperText={touched.lastName && errors.lastName}
      />

      <div className={classes.formBox}>
        <div className={classes.formGroup}>
          <div className={classes.formBoxInputs}>
            {new Array(count.tel).fill().map((_, id) => (
              <TextField
                className={classes.input}
                key={id}
                label="Телефон"
                type="tel"
                id={`tel${id}`}
                onBlur={handleBlur('tel')}
                onChange={handleChange('tel')}
                value={values.tel[id]}
                error={touched.tel[id] && !!errors.tel[id]}
                helperText={touched.tel[id] && errors.tel[id]}
              />
            ))}
          </div>
          <div className={classes.formAddBtn}>
            <IconButton onClick={handleAddField('tel')} color="primary" aria-label="add tel field">
              <ControlPointIcon/>
            </IconButton>
          </div>
        </div>
        <div className={classes.formGroup}>
          <div className={classes.formBoxInputs}>
            {new Array(count.email).fill().map((_, id) => (
              <TextField
                className={classes.input}
                key={id}
                label="Email"
                type="email"
                id={`email${id}`}
                onBlur={handleBlur('email')}
                onChange={handleChange('email')}
                value={values.email[id]}
                error={touched.email[id] && !!errors.email[id]}
                helperText={touched.email[id] && errors.email[id]}
              />
            ))}
          </div>
          <div className={classes.formAddBtn}>
            <IconButton onClick={handleAddField('email')} color="primary" aria-label="add email field">
              <ControlPointIcon/>
            </IconButton>
          </div>
        </div>
      </div>

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
        Сохранить
      </Button>
    </form>
  );
};

export default UserForm;
