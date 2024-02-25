import axios from "axios";
import { getToken, saveToken, saveData, destroyToken } from "./token";

// const apiUrl = 'http://127.0.0.1:8000/api/'
// const apiUrl = 'http://52.68.248.212:8001/api/';

// console.log(apiUrl)

class AuthService {
  async login(data) {
    // const headers = {
    //   Accept: `application/json`,
    // };
    // try {
    //   const response = await axios.post("login", data, { headers: headers });
    //   if (response.data.api_token) {
    //     saveToken(response.data.api_token);
    //     saveData(JSON.stringify(response.data.data));
    //   }
    //   return response;
    // } catch (error) {
    //   return error;
    // }

    
  }

  async register(data) {
    const headers = {
      Accept: `application/json`,
    };
    try {
      const response = await axios.post(
        apiUrl + "/api/register",
        data,
        { headers: headers }
      );
      if (response.data.api_token) {
        saveToken(response.data.api_token);
        saveData(JSON.stringify(response.data.data));
      }

      return response;
    } catch (error) {
      return error;
    }
  }

  async otp(data) {
    const headers = {
      Accept: `application/json`,
    };
    try {
      const response = await axios.post(
        apiUrl + "candidate/otp-verification",
        data,
        { headers: headers }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async resendOtp() {
    const headers = {
      Accept: `application/json`,
    };
    try {
      const response = await axios.post(apiUrl + "candidate/resend-otp", {
        headers: headers,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async logout() {
    // console.log('token',getToken());

    const headers = {
      Accept: `application/json`,
      Authorization: `Bearer ${getToken()}`,
    };
    try {
      const response = await axios.post(apiUrl + "candidate/auth/logout", {
        headers: headers,
      });

      destroyToken();

      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new AuthService();
