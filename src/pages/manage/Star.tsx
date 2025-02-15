import { useTitle } from "ahooks";
import { FC } from "react";
import styles from "./Common.module.scss";
import { Typography, Spin, Empty } from "antd";
import QuestionCard from "@/components/QuestionCard";
import ListSearch from "@/components/ListSearch";
import { useLoadQuestionListData } from "@/Hooks/useLoadQuestionListData";
import ListPage from "@/components/ListPage";
const { Title } = Typography;

const Star: FC = () => {
  useTitle("Easy问卷 - 星标问卷");
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total } = data;

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
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          list.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
