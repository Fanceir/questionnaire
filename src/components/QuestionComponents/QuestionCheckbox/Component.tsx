/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-23 13:51:10
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 14:17:30
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionCheckbox/Component.tsx
 * @Description: 复选框组件
 */
import { FC } from "react";
import {
  QuestionCheckboxPropsType,
  QuesitonCheckboxDefaultProps,
} from "./interface";
import { Typography, Space, Checkbox } from "antd";
const { Paragraph } = Typography;
const Component: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const {
    title,
    isVertical,
    list = [],
  } = {
    ...QuesitonCheckboxDefaultProps,
    ...props,
  };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
