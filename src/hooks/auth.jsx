import {useDispatch} from 'react-redux';
import {isFunction} from 'lodash';
import ACTION_TYPES from '../constants/actions';
import UserProfileAPIClient from '../api/user';

export const useAuth = () => {
  const dispatch = useDispatch();
  const login = data => dispatch({type: ACTION_TYPES.AUTH.LOGIN, ...data});
  const updateUser = user =>
    dispatch({type: ACTION_TYPES.AUTH.USER.UPDATE_USER, user});
  const userAPIClient = new UserProfileAPIClient();

  const loginWithEmail = ({email, password}) =>
    userAPIClient.loginWithEmail(email, password).then(login);

  const loginWithPhone = ({otp, phone}) =>
    userAPIClient.confirmLoginWithOTP(phone, otp).then(login);

  const sendOTP = (destination, setShowVerifyOTP, checkUser = true) =>
    userAPIClient
      .sendOTP(destination, checkUser)
      .then(
        () => isFunction(setShowVerifyOTP) && setShowVerifyOTP(destination),
      );

  const signupUser = ({email, name, mobile, password}, setShowVerifyOTP) =>
    userAPIClient
      .signup({email, name, mobile, password})
      .then(() => sendOTP(mobile, setShowVerifyOTP));

  const verifyMobileAndLogin = ({otp, mobile, email, password}) =>
    userAPIClient
      .validateContactInfo({mobile, otp}, true)
      .then(() => loginWithEmail({email, password}));

  const validateContactInfo = (payload, onSuccess) =>
    userAPIClient
      .validateContactInfo(payload, true)
      .then(getUserInfo)
      .then(() => isFunction(onSuccess) && onSuccess());

  const getUserInfo = () =>
    userAPIClient
      .getUserInfo()
      .then(user => updateUser(user))
      .catch(error => {
        console.log('Error while fetching user: ', error);
        if (error.response.status === 401) {
          dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
        }
      });

  const resetPassword = (currentPassword, newPassword) =>
    userAPIClient.resetPassword(currentPassword, newPassword).then(getUserInfo);

  return {
    loginWithEmail,
    loginWithPhone,
    sendOTP,
    signupUser,
    verifyMobileAndLogin,
    validateContactInfo,
    getUserInfo,
    resetPassword,
  };
};
