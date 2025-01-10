import AxiosClient from "./axios";

const URL_CAMPAIGN = "/campaigns";

const campaignApi = {
  getAll: async () => {
    const res = await AxiosClient.get(URL_CAMPAIGN);
    return res.data;
  },
};

export default campaignApi;
