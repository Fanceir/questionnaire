import { FC, useState } from "react";
import styles from "./List.module.scss";
import { useTitle } from "ahooks";
import QuestionCard from "../../components/QuestionCard";
const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: true,
    isStar: false,
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
  const [questionList, setQuestionList] = useState(rawQuestionList);
  useTitle("我的问卷");
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
          const { _id } = q;
          return <QuestionCard key={_id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  );
};
export default List;
