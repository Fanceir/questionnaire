/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-15 15:01:08
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 22:19:05
 * @FilePath: /questionnaire/src/pages/question/Edit/EditCanvas.tsx
 * @Description: 编辑画布的页面
 */
import { FC, MouseEvent } from "react";
import styles from "./EditCanvas.module.scss";
import { getComponentConfByType } from "@/components/QuestionComponents";
import useGetComponentInfo from "@/Hooks/useGetComponentInfo";
import {
  changeSelectedId,
  ComponentInfoType,
  moveComponent,
} from "@/store/componentReducer";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useBindCanvasKeyPress from "@/Hooks/useBindCanvasKeyPress";
import SortableContainer from "@/components/DragSortable/SortableContainer";
import SortableItem from "@/components/DragSortable/SortableItem";

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

  // 绑定画布按键事件
  useBindCanvasKeyPress();

  // 如果加载中，显示加载中的图标
  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  const componentListWithId = componentList.map((c) => {
    return { id: c.fe_id, ...c };
  });
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
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
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(e) => handleClick(fe_id, e)}
                >
                  <div className={styles.component}>
                    {genComponent(component)}
                  </div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};
export default EditCanvas;
