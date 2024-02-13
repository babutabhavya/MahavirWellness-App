import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

export const validatePhoneNumber = phone =>
  isString(phone) && !isEmpty(phone) && phone.length === 10;

export const validateOTP = otp =>
  isString(otp) && !isEmpty(otp) && otp.length === 6;

export function validatePassword(password) {
  // Password must be at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  // Password must contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Password must contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Password must contain at least one digit
  if (!/\d/.test(password)) {
    return false;
  }

  // Password can contain special characters (you can customize this based on your requirements)
  // For example, allowing only specific special characters: !@#$%^&*
  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }

  // Password is valid
  return true;
}

export const validateEmail = value => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};
