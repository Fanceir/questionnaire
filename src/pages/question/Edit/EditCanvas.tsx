import { FC } from "react";
import styles from "./EditCanvas.module.scss";
import { getComponentConfByType } from "@/components/QuestionComponents";
import useGetComponentInfo from "@/Hooks/useGetComponentInfo";
// 临时引入
import { ComponentInfoType } from "@/store/componentReducer";
import { Spin } from "antd";
type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;// 每个组件的信息从这里获取
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) {
    return null;
  }
  const { Component } = componentConf;
  return <Component {...props} />;
}

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
    <div className={styles.EditCanvas}>
      {componentList.map((component) => {
        const { fe_id } = component;

        return (
          <div key={fe_id} className={styles["component-wrapper"]}>
            <div className={styles.component}>{genComponent(component)}</div>
          </div>
        );
      })}
    </div>
  );
};
export default EditCanvas;
