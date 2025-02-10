import { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Space, Divider, Tag, Popconfirm, Modal } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

type QuestionCardProps = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};
const QuestionCard: FC<QuestionCardProps> = (props: QuestionCardProps) => {
  const handleDelete = () => {
    Modal.confirm({
      title: "确定要删除该问卷吗",
      content: "删除后无法恢复",
      okText: "确定",
      cancelText: "取消",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {},
    });
  };
  const nav = useNavigate();
  const { _id, title, createdAt, answerCount, isStar, isPublished } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={
                isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`
              }
            >
              <Space>
                {isStar && <StarOutlined style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color="green">已发布</Tag>
              ) : (
                <Tag color="red">未发布</Tag>
              )}
              <span>答卷:{answerCount}</span>
              <span> {createdAt}</span>
              {isStar && <span>标星</span>}
            </Space>
          </div>
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={isPublished}
              >
                问卷统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button type="text" icon={<StarOutlined />} size="small">
                {isStar ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="确定要复制该问卷吗"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {}}
              >
                {" "}
                <Button type="text" size="small" icon={<CopyOutlined />}>
                  复制
                </Button>
              </Popconfirm>

              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuestionCard;
