import DEV from '.';

const API_BASE_URL = DEV
  ? 'http://localhost:8000/api/'
  : 'http://ec2-13-234-117-202.ap-south-1.compute.amazonaws.com/api/';

const CONTENT_BASE_URL = DEV
  ? 'http://localhost:8000'
  : 'http://ec2-13-234-117-202.ap-south-1.compute.amazonaws.com';

export {API_BASE_URL, CONTENT_BASE_URL};
