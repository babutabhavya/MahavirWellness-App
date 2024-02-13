import Api, {ApiHeaders} from '.';

class UserProfileAPIClient extends ApiHeaders {
  constructor() {
    super();
    this.endpoint = 'user';
  }

  async loginWithEmail(email, password) {
    return await Api.post(`/${this.endpoint}/login/password/`, {
      email,
      password,
    }).then(response => response.data);
  }

  async confirmLoginWithOTP(destination, otp) {
    return await Api.post(`/${this.endpoint}/login/otp/`, {
      destination,
      otp,
    }).then(response => response.data);
  }

  async signup(payload) {
    return await Api.post(`/${this.endpoint}/signup/`, payload).then(
      response => response.data,
    );
  }

  async validateContactInfo(payload, checkUser = false) {
    return await Api.post(
      `/${this.endpoint}/otp/validate/`,
      {
        ...payload,
        check_user: checkUser,
      },
      this.authenticationHeaders,
    ).then(response => response.data);
  }

  async forgotPassword(email) {
    return await Api.post(`/${this.endpoint}/forgot-password/`, {email}).then(
      response => response.data,
    );
  }

  async resetPassword(currentPassword, newPassword) {
    return await Api.post(
      `/${this.endpoint}/password/reset/`,
      {
        current_password: currentPassword,
        new_password: newPassword,
      },
      this.authenticationHeaders,
    ).then(response => response.data);
  }

  async sendOTP(destination, checkUser = false) {
    return await Api.post(`/${this.endpoint}/otp/`, {
      destination,
      check_user: checkUser,
    }).then(response => response.data);
  }

  async getUserInfo() {
    return await Api.get(
      `/${this.endpoint}/info/`,
      {},
      this.authenticationHeaders,
    ).then(response => response.data);
  }

  async updateProfile(data) {
    return await Api.patch(
      `/${this.endpoint}/profile/`,
      data,
      this.authenticationHeaders,
    ).then(response => response.data);
  }

  async updateEmail(email) {
    return await Api.put(
      `/${this.endpoint}/email/`,
      {email},
      this.authenticationHeaders,
    ).then(response => response.data);
  }

  async updatePhoneNumber(phoneNumber) {
    return await Api.put(
      `/${this.endpoint}/phone-number/`,
      {phoneNumber},
      this.authenticationHeaders,
    ).then(response => response.data);
  }
}

export default UserProfileAPIClient;
