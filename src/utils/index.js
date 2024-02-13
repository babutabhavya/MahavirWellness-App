export const getAPIErrorMessage = err => {
  console.log(err.response.data);
  if (err && err.response && err.response.data && err.response.data.detail) {
    return err.response.data.detail;
  } else if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data.error
  ) {
    return err.response.data.error;
  } else {
    return 'Something went wrong! Please try again later';
  }
};
