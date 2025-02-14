/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "@/utils/user-token";
import axios from "axios";
const instance = axios.create({
  timeout: 10 * 1000,
});

// request拦截 每次请求都带上token
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`; //jwt 的格式
    return config;
  },
  (error) => {
    console.error(error);
  },
);

//response 拦截
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResDataType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    console.error(msg);
  }
  return data as any;
});
export default instance;
export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};
export type ResDataType = {
  [key: string]: any;
};
