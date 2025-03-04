import { FC, useCallback } from "react";
import {
  componentConfGroup,
  ComponentConfType,
} from "@/components/QuestionComponents";
import { Typography } from "antd";
const { Title } = Typography;
import styles from "./ComponentLib.module.scss";
import { addComponent } from "@/store/componentReducer";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";

const ComponentLib: FC = () => {
  const dispatch = useDispatch();
  const handleClick = useCallback(
    (c: ComponentConfType) => {
      const { defaultProps, title, type } = c;
      dispatch(
        addComponent({
          fe_id: nanoid(), //这里就当作一个前端生成的id
          type,
          title,
          props: defaultProps,
        }),
      );
    },
    [dispatch],
  );

  function genComponent(c: ComponentConfType) {
    const { Component, type } = c;
    return (
      <div key={type} className={styles.wrapper} onClick={() => handleClick(c)}>
        <Component />
        <div className={styles.component}></div>
      </div>
    );
  }
  return (
    <div>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0" }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentLib;
