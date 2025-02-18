import { FC } from "react";
import {
  componentConfGroup,
  ComponentConfType,
} from "@/components/QuestionComponents";
import { Typography } from "antd";
const { Title } = Typography;
import styles from "./ComponentLib.module.scss";

function genComponent(c: ComponentConfType) {
  const { Component } = c;
  return (
    <div className={styles.wrapper}>
      <Component />
      <div className={styles.component}></div>
    </div>
  );
}

const ComponentLib: FC = () => {
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
