import { useTitle } from "ahooks";
import { FC, useState } from "react";
import styles from "./common.module.scss";
import { Typography, Empty } from "antd";
import QuestionCard from "@/components/QuestionCard";
import ListSearch from "@/components/ListSearch";
const { Title } = Typography;
const rawQuestionList = [
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

const Star: FC = () => {
  useTitle("Easy问卷 - 星标问卷");
  const [questionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
