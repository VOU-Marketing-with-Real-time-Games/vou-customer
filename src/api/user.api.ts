import { IIncreasePlayTurnReq, IUser } from "../types/user";
import AxiosClient from "./axios";

const URL_USER = "/users";
const URL_AUTH = "/auth";
const URL_LOGIN = `${URL_AUTH}/login`;
const URL_REGISTER = `${URL_USER}/register`;
const URL_GET_OTP = `${URL_AUTH}/get-otp`;
const URL_VERIFY = `${URL_AUTH}/verify`;

export const userApi = {
  register: async (data: IUser) => {
    const res = await AxiosClient.post(URL_REGISTER, data);
    return res.data;
  },

  login: async (username: string, password: string) => {
    const res = await AxiosClient.post(URL_LOGIN, { username, password });
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

  increasePlayTurn: async (data: IIncreasePlayTurnReq) => {
    const res = await AxiosClient.post(`${URL_USER}/${data.userID}/increase-play-turn`, data);
    return res.data;
  },

  decreasePlayTurn: async (data: IIncreasePlayTurnReq) => {
    const res = await AxiosClient.post(`${URL_USER}/${data.userID}/decrease-play-turn`, data);
    return res.data;
  },

  getProfile: async (username: string) => {
    const res = await AxiosClient.get(`${URL_USER}/username/${username}`);
    return res.data;
  },

  getPlayTurn: async (userId: string | number) => {
    const res = await AxiosClient.get(`${URL_USER}/${userId}/play-turn`);
    return res.data;
  },

  searchByEmail: async (email: string) => {
    const res = await AxiosClient.get(`${URL_USER}/search/${email}`);
    return res.data;
  },
};
