import { IQuizAnswer } from "../types/quiz";
import AxiosClient from "./axios";

export const URL_USER_ANSWER = "/user-answers";

const quizApi = {
  setUserAnswer: async (data: IQuizAnswer) => {
    await AxiosClient.post(URL_USER_ANSWER, data);
  },
};

export default quizApi;
