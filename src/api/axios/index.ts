import axios from "axios";
import { API_URL } from "@env";

const AxiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default AxiosClient;
