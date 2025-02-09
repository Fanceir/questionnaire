import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
const Home: FC = () => {
  const nav = useNavigate();
  const clickHandler = () => {
    nav("/login");
  };
  return (
    <>
      <p>Home</p>
      <div>
        <button onClick={clickHandler}> 登录</button>
        <Link to="/register">注册</Link>
      </div>
    </>
  );
};

export default Home;
