import Api, {ApiHeaders} from '.';

class AddressClient extends ApiHeaders {
  constructor() {
    super();
    this.basePath = 'address/';
  }

  async createAddress(data) {
    const path = this.basePath;
    return Api.post(path, {...data}, this.authenticationHeaders).then(
      response => response.data,
    );
  }

  async updateAddress(id, data) {
    const path = `${this.basePath}${id}/`;
    return Api.put(path, {...data}, this.authenticationHeaders).then(
      response => response.data,
    );
  }

  async listAddresses(userId) {
    const path = this.basePath;
    return Api.get(path, {}, this.authenticationHeaders).then(
      response => response.data,
    );
  }

  async deleteAddress(id) {
    const path = `${this.basePath}${id}/`;
    return Api.delete(path, {}, this.authenticationHeaders);
  }
}

export default AddressClient;
