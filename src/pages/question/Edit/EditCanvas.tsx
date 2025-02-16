import { FC } from "react";
import styles from "./EditCanvas.module.scss";

import useGetComponentInfo from "@/Hooks/useGetComponentInfo";
// 临时引入

import { Spin } from "antd";
type PropsType = {
  loading: boolean;
};

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo();
  console.log(componentList);
  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  return (
    <div className={styles.canvas}>
      {componentList.map((item) => {
        const { fe_id } = item;

        return <div key={fe_id}></div>;
      })}
    </div>
  );
};
export default EditCanvas;
