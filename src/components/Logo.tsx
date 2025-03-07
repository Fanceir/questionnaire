import { FC, useEffect, useState } from "react";
import { Space, Typography } from "antd";
import styles from "./Logo.module.scss";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useGetUserInfo from "@/Hooks/useGetUserInfo";
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from "@/router";
const { Title } = Typography;
const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [username]);
  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>Easy 问卷</Title>
        </Space>
      </Link>
    </div>
  );
};
export default Logo;
