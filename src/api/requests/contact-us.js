import Api, {ApiHeaders} from '..';

class ContactUsClient extends ApiHeaders {
  constructor() {
    super();
    this.basePath = 'requests/contact-us/';
  }

  async create(data) {
    const response = await Api.post(
      this.basePath,
      data,
      this.authenticationHeaders,
    );
    return response.data;
  }
}

export default ContactUsClient;
