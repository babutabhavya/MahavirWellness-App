import Api, {ApiHeaders} from '.';

class MyDevicesClient extends ApiHeaders {
  constructor() {
    super();
    this.basePath = 'products/mydevices';
  }

  async list() {
    const path = `${this.basePath}/`;
    return Api.get(path, {}, this.authenticationHeaders).then(
      response => response.data,
    );
  }

  async create(data) {
    const path = `${this.basePath}/`;
    return Api.post(path, data, this.authenticationHeaders).then(
      response => response.data,
    );
  }
}

export default MyDevicesClient;
