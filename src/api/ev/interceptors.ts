import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface IRequestAxios extends InternalAxiosRequestConfig {
  skipLoading?: boolean;
}

const onRequestConfig = (config: IRequestAxios) => {
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  config.headers["xi-api-key"] = process.env.NEXT_PUBLIC_ELEVENLAB_API_TOKEN;
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.timeout = 30000;
  config.responseType = "blob";

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (res: AxiosResponse): AxiosResponse => res;

const onResponseError = async (err: AxiosError): Promise<AxiosError | undefined> => Promise.reject(err?.response?.data);

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequestConfig, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (err: AxiosError) => onResponseError(err));
};
