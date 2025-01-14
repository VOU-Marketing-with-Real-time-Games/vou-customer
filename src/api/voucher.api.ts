import AxiosClient from "./axios";

const URL_VOUCHER = "/vouchers";

const voucherApi = {
  getUserVoucher: async (userId: string | number) => {
    const res = await AxiosClient.get(`${URL_VOUCHER}/user/${userId}`);
    return res.data;
  },
};

export default voucherApi;
