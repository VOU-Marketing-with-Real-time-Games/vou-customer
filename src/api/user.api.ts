import { IUser } from "../types/user";
import AxiosClient from "./axios";

const URL_USER = "/users";
const URL_AUTH = "/auth";
const URL_LOGIN = "/login";
const URL_REGISTER = `${URL_USER}/register`;
const URL_GET_OTP = `${URL_AUTH}/get-otp`;
const URL_VERIFY = `${URL_AUTH}/verify`;

export const userApi = {
  register: async (data: IUser) => {
    const res = await AxiosClient.post(URL_REGISTER, data);
    return res.data;
  },

  sendOtp: async (email: string) => {
    const res = await AxiosClient.get(`${URL_GET_OTP}?email=${email}`);
    return res.data;
  },

  verifyAccount: async (email: string, otp: string) => {
    const res = await AxiosClient.post(`${URL_VERIFY}`, { email, otp });
    return res.data;
  },
};
