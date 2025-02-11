/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const instance = axios.create({
  timeout: 10 * 1000,
});

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
