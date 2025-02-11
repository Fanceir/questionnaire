import { Button, Typography } from "antd";
import { FC, useEffect } from "react";
import { MANAGE_INDEX_PATHNAME } from "@/router";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
// import "../_mock/index";
import axios from "axios";
const Home: FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    axios.get("/api/test").then((res) => {
      console.log(res);
    });
  }, []);
  const { Title, Paragraph } = Typography;
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查｜ 在线投票</Title>
        <Paragraph>
          问卷调查是一种常见的数据收集方式，通过问卷调查可以收集到大量的数据，从而更好的了解用户的需求。
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
