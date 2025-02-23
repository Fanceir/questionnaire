import { useDispatch } from "react-redux";
import useGetComponentInfo from "@/Hooks/useGetComponentInfo";
import styles from "./Layers.module.scss";
import { ChangeEvent, FC, useState } from "react";
import { Button, Input, message, Space } from "antd";
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLock,
} from "@/store/componentReducer";
import classNames from "classnames";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  const [changingTitleId, setChangingTitleId] = useState("");

  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find((c) => c.fe_id === fe_id);

    if (curComp && curComp.isHidden) {
      message.info("不能选中隐藏的组件");
      return;
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId("");
      return;
    }
    // 点击修改标题
    setChangingTitleId(fe_id);
  }

  // 修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();
    if (!value) {
      return;
    }
    dispatch(changeComponentTitle({ fe_id: changingTitleId, title: value }));
  }

  //切换隐藏显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  }
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLock({ fe_id }));
  }

  return (
    <>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => handleTitleClick(fe_id)}
            >
              {changingTitleId === fe_id ? (
                <Input
                  value={title}
                  onChange={changeTitle}
                  onPressEnter={() => setChangingTitleId("")}
                  onBlur={() => setChangingTitleId("")}
                />
              ) : (
                <div>{title}</div>
              )}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  className={!isHidden ? styles.btn : ""}
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? "primary" : "text"}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                ></Button>
                <Button
                  shape="circle"
                  size="small"
                  className={!isLocked ? styles.btn : ""}
                  icon={<LockOutlined />}
                  type={isLocked ? "primary" : "text"}
                  onClick={() => changeLocked(fe_id)}
                ></Button>
              </Space>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Layers;
