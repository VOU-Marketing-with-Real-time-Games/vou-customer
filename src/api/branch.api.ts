import AxiosClient from "./axios";

const URL_BRANCH = "/branches";

const branchApi = {
  getAll: async () => {
    const res = await AxiosClient.get(URL_BRANCH);
    return res.data;
  },
};

export default branchApi;
