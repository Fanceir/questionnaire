import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from "./MainLayout.module.scss";
import Logo from "@/components/Logo";
const { Header, Content, Footer } = Layout;
const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>登录</div>
      </Header>
      <Layout>
        <Content className={styles.main}>
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        Easy问卷 &copy; 2024 - present Created by Fanceir
      </Footer>
    </Layout>
  );
};
export default MainLayout;
