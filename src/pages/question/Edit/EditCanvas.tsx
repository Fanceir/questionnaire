/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-15 15:01:08
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 21:47:21
 * @FilePath: /questionnaire/src/pages/question/Edit/EditCanvas.tsx
 * @Description:
 */
import { FC, MouseEvent } from "react";
import styles from "./EditCanvas.module.scss";
import { getComponentConfByType } from "@/components/QuestionComponents";
import useGetComponentInfo from "@/Hooks/useGetComponentInfo";
// 临时引入
import { changeSelectedId, ComponentInfoType } from "@/store/componentReducer";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import classNames from "classnames";

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo; // 每个组件的信息从这里获取
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) {
    return null;
  }
  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  // 点击组件时触发
  function handleClick(id: string, event: MouseEvent) {
    event.stopPropagation(); // 阻止事件冒泡
    dispatch(changeSelectedId(id));
  }
  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  return (
    <div className={styles.EditCanvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((component) => {
          const { fe_id, isLocked } = component;

          const wrapperDefaultClassname = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassname]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          });
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={(e) => handleClick(fe_id, e)}
            >
              <div className={styles.component}>{genComponent(component)}</div>
            </div>
          );
        })}
    </div>
  );
};
export default EditCanvas;
