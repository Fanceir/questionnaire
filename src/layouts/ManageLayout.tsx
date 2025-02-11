import { FC } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./ManageLayout.module.scss";
import { Button, Space, Divider, message } from "antd";
import {
  BarsOutlined,
  DeleteFilled,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { createQuestionService } from "@/services/question";
import { useRequest } from "ahooks";
const ManageLayout: FC = () => {
  const nav = useNavigate();
  const pathname = useLocation().pathname;

  const { loading, run: handleCreateClick } = useRequest(
    createQuestionService,
    {
      manual: true,
      onSuccess: (result) => {
        nav(`/question/edit/${result.id}`);
        message.success("创建成功");
      },
    },
  );
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateClick}
              disabled={loading}
            >
              新建问卷
            </Button>
            <Divider style={{ borderTop: "transparent" }} />
            <Button
              type={pathname.startsWith("/manage/list") ? "default" : "text"}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => nav("/manage/list")}
            >
              我的问卷
            </Button>
            <Button
              type={pathname.startsWith("/manage/star") ? "default" : "text"}
              size="large"
              icon={<StarOutlined />}
              onClick={() => nav("/manage/star")}
            >
              星标问卷
            </Button>
            <Button
              type={pathname.startsWith("/manage/trash") ? "default" : "text"}
              size="large"
              icon={<DeleteFilled />}
              onClick={() => nav("/manage/trash")}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default ManageLayout;
