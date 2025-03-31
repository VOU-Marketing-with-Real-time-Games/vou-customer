import AxiosClient from "./axios";

const URL_CAMPAIGN = "/campaigns";
const URL_GAME_CAMPAIGN = "/game-campaigns";
const URL_NEWEST = `${URL_CAMPAIGN}/latest`;

const campaignApi = {
  getAll: async () => {
    const res = await AxiosClient.get(URL_CAMPAIGN);
    return res.data;
  },

  getAllFavorite: async (userId: number) => {
    const res = await AxiosClient.get(`${URL_CAMPAIGN}/user-favourite/${userId}`);
    return res.data;
  },

  search: async (name: string) => {
    const res = await AxiosClient.get(`${URL_CAMPAIGN}/search?name=${name}`);
    return res.data;
  },

  getNewest: async () => {
    const res = await AxiosClient.get(URL_NEWEST);
    return res.data;
  },

  checkIsFavorite: async (userId: number, campaignId: number) => {
    const res = await AxiosClient.get(`${URL_CAMPAIGN}/user-favourite/${userId}/campaign/${campaignId}`);
    return res.data;
  },

  addToFavorite: async (userId: number, campaignId: number) => {
    const res = await AxiosClient.post(`${URL_CAMPAIGN}/add-favourite`, {
      userId,
      campaignId,
    });
    return res.data;
  },

  getListGame: async (campaignId: number) => {
    const res = await AxiosClient.get(`${URL_GAME_CAMPAIGN}/campaign/${campaignId}`);
    return res.data;
  },
};

export default campaignApi;
