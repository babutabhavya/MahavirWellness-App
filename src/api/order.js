const {default: Api, ApiHeaders} = require('.');

export default class OrderClient extends ApiHeaders {
  constructor() {
    super();
    this.apiBaseUrl = 'orders';
  }

  async initiate(orderData) {
    return await Api.post(
      `${this.apiBaseUrl}/initiate-order/`,
      orderData,
      this.authenticationHeaders,
    );
  }

  async complete(paymentData) {
    return await Api.post(
      `${this.apiBaseUrl}/complete-order/`,
      paymentData,
      this.authenticationHeaders,
    );
  }
  async list() {
    return await Api.get(`${this.apiBaseUrl}/`, {}, this.authenticationHeaders)
      .then(result => result.data)
      .catch(error => console.log(error.response.data));
  }
}
