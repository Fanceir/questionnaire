import { useTitle } from "ahooks";
import { FC, useState } from "react";
import styles from "./common.module.scss";
import { Typography, Button, Space, Empty, Table, Tag, Modal } from "antd";

const { Title } = Typography;
const { confirm } = Modal;
const ListQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createdAt: "3月10日13:00",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: false,
    isStar: false,
    answerCount: 51,
    createdAt: "3月15日13:00",
  },
  {
    _id: "q3",
    title: "问卷2",
    isPublished: false,
    isStar: false,
    answerCount: 123,
    createdAt: "3月17日13:50",
  },
  {
    _id: "q4",
    title: "问卷2",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: "3月12日14:02",
  },
];

const Trash: FC = () => {
  useTitle("Easy问卷 - 回收站");

  const [questionList] = useState(ListQuestionList);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
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
  const handleDelete = () => {
    confirm({
      title: "确定删除这些问卷吗?",
      content: "删除后不可恢复",
      cancelText: "取消",
      okText: "删除",
      onOk() {
        alert(`删除 ${JSON.stringify(selectedIds)}`);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button
            danger
            disabled={selectedIds.length === 0}
            onClick={handleDelete}
          >
            删除
          </Button>
        </Space>
      </div>
      <Table
        columns={tableColumns}
        dataSource={questionList}
        rowKey={(q) => q._id}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}></div>
    </>
  );
};

export default Trash;
