import { FC, useState } from "react";
import styles from "./Common.module.scss";
import { useTitle } from "ahooks";
import { Typography } from "antd";
import QuestionCard from "../../components/QuestionCard";
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
const List: FC = () => {
  const { Title } = Typography;
  const [questionList] = useState(rawQuestionList);
  useTitle("我的问卷");

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>上滑加载更多</div>
    </>
  );
};
export default List;
