import { FC, useState } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import {
  updateQuestionService,
  duplicateQuestionService,
} from "@/services/question";

type QuestionCardProps = {
  _id: string; //服务端使用的是mongodb，所以这里使用的是_id,而且不重复，所以这个可以交给服务端去实现
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
      onOk: deleteQuestion,
    });
  };
  const nav = useNavigate();

  //修改标星
  const [isStarState, setIsStarState] = useState(props.isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success("操作成功");
      },
    },
  );

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        message.success("复制成功");
        nav(`/question/edit/${result._id}`);
      },
    },
  );

  //删除
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { run: deleteQuestion, loading: deleteLoading } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isDeleted: true });
      return data;
    },
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        setIsDeletedState(true);
      },
    },
  );
  if (isDeletedState) return null;
  const { _id, title, createdAt, answerCount, isPublished } = props;
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
                {isStarState && <StarOutlined style={{ color: "red" }} />}
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
              {isStarState && <span>标星</span>}
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
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="确定要复制该问卷吗"
                okText="确定"
                cancelText="取消"
                onConfirm={duplicate}
              >
                <Button
                  type="text"
                  size="small"
                  icon={<CopyOutlined />}
                  disabled={duplicateLoading}
                >
                  复制
                </Button>
              </Popconfirm>

              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                disabled={deleteLoading}
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
