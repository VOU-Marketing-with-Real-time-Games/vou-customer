import AxiosClient from "./axios";

const URL_CAMPAIGN = "/campaigns";

const campaignApi = {
  getAll: async () => {
    const res = await AxiosClient.get(URL_CAMPAIGN);
    return res.data;
  },

  search: async (name: string) => {
    const res = await AxiosClient.get(`${URL_CAMPAIGN}/search?name=${name}`);
    return res.data;
  },
};

export default campaignApi;
