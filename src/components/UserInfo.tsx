import { FC } from "react";
import { Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "@/router";
const UserInfo: FC = () => {
  //TODO: 对于已经登录的用户还未作处理
  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  );
};
export default UserInfo;
