import { FC } from "react";
import styles from "./QuestionCard.module.scss";

type QuestionCardProps = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};
const QuestionCard: FC<QuestionCardProps> = (props: QuestionCardProps) => {
  const { _id, title, createdAt, answerCount, isStar, isPublished } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <a href="#">
              {title}
              {_id}
            </a>
          </div>
          <div className={styles.right}>
            <span>答卷:{answerCount}</span>
            &nbsp;&nbsp;
            {isPublished ? (
              <span style={{ color: "green" }}>已发布</span>
            ) : (
              <span style={{ color: "red" }}>未发布</span>
            )}
            &nbsp;
            <span> {createdAt}</span>
            {isStar && <span>标星</span>}
          </div>
        </div>
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <button>编辑问卷</button>
            <button>数据统计</button>
          </div>
          <div className={styles.right}>
            <button>标星</button>
            <button>复制</button>
            <button>删除</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuestionCard;
