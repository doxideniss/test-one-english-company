const regExp = {
  email: new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$', 'i'),
  tel: new RegExp('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4})')
};

export default (values, callback) => {
  const errors = {};
  const rules = {
    email: value => {
      if (Array.isArray(value)) {
        if (!Array.isArray(errors.email)) {
          errors.email = ['']
        }
        value.forEach((email, id) => {
          if (!!email && !regExp.email.test(email)) {
            errors.email[id] = "Неверный E-Mail";
          }
        })
      }else if (!regExp.email.test(value)) {
        errors.email = "Неверный E-Mail";
      }
    },
    password: value => {
      if (!value) {
        errors.password = "Введите пароль";
      }
    },
    firstName: value => {
      if (!value) {
        errors.firstName = "Введите имя";
      }
    },
    lastName: value => {
      if (!value) {
        errors.lastName = "Введите фамилию";
      }
    },
    tel: value => {
      if (!Array.isArray(errors.tel)) {
        errors.tel = ['']
      }
      if (Array.isArray(value)) {
        value.forEach((telephone, id) => {
          if (!!telephone && !regExp.tel.test(telephone)) {
            errors.tel[id] = "Неверный телефон";
          }
        })
      }
    }
  };

  Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));

  return callback(errors);
};
