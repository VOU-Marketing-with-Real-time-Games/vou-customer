import AxiosClient from "./axios";

const URL_NOTIFICATION = "/notifications";

const notificationApi = {
  getAllNotifications: async (userId: string | number) => {
    const res = await AxiosClient.get(`${URL_NOTIFICATION}/user/${userId}`);
    return res.data;
  },
};

export default notificationApi;
