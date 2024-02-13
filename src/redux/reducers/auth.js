import ACTION_TYPES from '../../constants/actions';

const initialState = {
  user: undefined,
  isLoggedIn: false,
  accessToken: undefined,
  isGuest: undefined,
};

export default function authReducer(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case ACTION_TYPES.AUTH.LOGIN:
      return {
        ...newState,
        user: action.user,
        isLoggedIn: true,
        accessToken: action.token,
        isGuest: undefined,
      };
    case ACTION_TYPES.AUTH.GUEST:
      return {
        ...initialState,
        isGuest: true,
      };
    case ACTION_TYPES.AUTH.USER.UPDATE_USER:
      return {
        ...newState,
        user: action.user,
      };
    case ACTION_TYPES.AUTH.LOGOUT:
      return initialState;
    default:
      return newState;
  }
}
