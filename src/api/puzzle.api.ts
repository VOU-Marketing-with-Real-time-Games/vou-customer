import AxiosClient from "./axios";

const URL_PUZZLE = "/puzzles";
const URL_USER_ITEMS = "/user-items";

const puzzleApi = {
  addRandomItem: async (userId: string | number, puzzleId: string | number) => {
    const res = await AxiosClient.get(`${URL_USER_ITEMS}/add-random-item/user/${userId}/puzzle/${puzzleId}`);
    return res.data;
  },

  getPuzzle: async (puzzleId: string | number) => {
    const res = await AxiosClient.get(`${URL_PUZZLE}/${puzzleId}`);
    return res.data;
  },
};

export default puzzleApi;
