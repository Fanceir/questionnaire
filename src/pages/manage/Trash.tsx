import { useRequest, useTitle } from "ahooks";
import { FC, useState } from "react";
import styles from "./Common.module.scss";
import {
  Typography,
  Spin,
  Empty,
  Button,
  Space,
  Table,
  Tag,
  Modal,
  message,
} from "antd";
import ListSearch from "../../components/ListSearch";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useLoadQuestionListData } from "@/Hooks/useLoadQuestionListData";
import ListPage from "@/components/ListPage";
import {
  deleteQuestionService,
  updateQuestionService,
} from "@/services/question";
const { Title } = Typography;
const { confirm } = Modal;

type ListItemType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
  isDeleted: boolean;
};

const Trash: FC = () => {
  useTitle("Easy问卷 - 回收站");

  // 改造成useRequest
  const { loading, data, refresh } = useLoadQuestionListData({
    isDeleted: true,
  });

  let list: ListItemType[] = [];
  let total = 0;
  if (data) {
    list = data.list;
    total = data.total;
  }

  // 记录选中的 id
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function del() {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      content: "删除以后不可以找回",
      onOk: deleteQuestions,
    });
  }

  const recover = () => {
    recoverQuestion();
    setSelectedIds([]);
  };

  //恢复
  const { run: recoverQuestion } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        const data = await updateQuestionService(id, { isDeleted: false });
        return data;
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success("恢复成功");
        refresh();
      },
    },
  );

  // 删除
  const { run: deleteQuestions } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success("删除成功");
        refresh();
      },
    },
  );

  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
    },
  ];

  // 可以把 JSX 片段定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: "1px solid #e8e8e8" }}>
        <Table
          dataSource={list}
          columns={tableColumns}
          pagination={false}
          rowKey={(q) => q._id}
          rowSelection={{
            type: "checkbox",
            hideSelectAll: false,
            selectedRowKeys: selectedIds,
            onChange: (selectedRowKeys) => {
              // console.log(selectedRowKeys)
              setSelectedIds(selectedRowKeys as string[]);
            },
          }}
        />
      </div>
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
