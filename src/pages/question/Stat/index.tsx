import { FC, useState } from "react";
import useLoadQuestionData from "@/Hooks/useLoadQuestionData";
import { Button, Result, Spin } from "antd";
import useGetPageInfo from "@/Hooks/useGetPageInfo";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import styles from "./index.module.scss";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "@/services/PageStat";
import ChartStat from "./ChartStat";

const Stat: FC = () => {
  useTitle("问卷统计");
  const { loading } = useLoadQuestionData();
  const { isPublished } = useGetPageInfo();
  const nav = useNavigate();

  //状态提升
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");
  const LoadingElem = (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <Spin />
    </div>
  );

  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="该页面未发布"
            subTitle="对不起，您没有权限访问此页面"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回上一页
              </Button>
            }
          />
        </div>
      );
    }
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.center}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        {loading && LoadingElem}
        <div className={styles.content}>{genContentElem()}</div>
      </div>
    </div>
  );
};
export default Stat;
