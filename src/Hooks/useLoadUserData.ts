import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useRequest } from "ahooks";
import { getUserInfoService } from "@/services/user";
import { useDispatch } from "react-redux";
import { loginReducer } from "@/store/userReducer";
function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true);
  const dispatch = useDispatch();
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: (result) => {
      const { username, nickname } = result;
      // 将用户信息存入redux
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });
  const { username } = useGetUserInfo();
  // 判断当前redux中是否有用户信息，如果有则表示用户信息已经加载完成
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
  }, [username, run]);
  return { waitingUserData };
}

export default useLoadUserData;
