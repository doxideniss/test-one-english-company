export default (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuth: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {},
        isAuth: false
      };
    case 'SET_TITLE':
      return {
        ...state,
        titlePage: action.payload
      };
    case 'ADD_CHECKED':
      return {
        ...state,
        checkedId: [...state.checkedId, action.payload]
      };
    case 'REMOVE_CHECKED':
      return {
        ...state,
        checkedId: state.checkedId.filter((id) => id !== action.payload)
      };
    case 'SET_CHECKED':
      return {
        ...state,
        checkedId: action.payload
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload.map(item => ({
          ...item,
          tel: item.tel.split(', '),
          email: item.email.split(', '),
        }))
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'UPDATE_USER':
      const indexUser = state.users.findIndex((user) => user.id === action.payload.id);
      return {
        ...state,
        users: [...state.users.slice(0, indexUser), {...action.payload}, ...state.users.slice(indexUser + 1)]
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload)
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state
  }
};
