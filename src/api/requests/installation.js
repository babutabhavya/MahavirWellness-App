import Api, {ApiHeaders} from '..';

class InstallationRequestClient extends ApiHeaders {
  constructor() {
    super();
    this.basePath = 'requests/installation/';
  }

  async create(data) {
    const response = await Api.post(
      this.basePath,
      data,
      this.authenticationHeaders,
    );
    return response.data;
  }

  async list() {
    const response = await Api.get(
      this.basePath,
      {},
      this.authenticationHeaders,
    );
    return response.data;
  }
}

export default InstallationRequestClient;
