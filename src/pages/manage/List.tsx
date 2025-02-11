import { FC } from "react";
import styles from "./Common.module.scss";
import { useTitle } from "ahooks";
import { Spin, Typography } from "antd";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "@/components/ListSearch";

import { useLoadQuestionListData } from "@/Hooks/useLoadQuestionListData";
const List: FC = () => {
  const { Title } = Typography;
  const { data = {}, loading } = useLoadQuestionListData({});
  const { list } = data;
  useTitle("我的问卷");

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading &&
          list.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>上滑加载更多</div>
    </>
  );
};
export default List;
