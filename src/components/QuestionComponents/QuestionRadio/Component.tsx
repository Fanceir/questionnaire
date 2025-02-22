/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-22 21:52:11
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-22 21:56:25
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionRadio/Component.tsx
 * @Description:  选择题组件
 */
import { FC } from "react";
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from "./interface";
import { Radio, Space, Typography } from "antd";

const { Paragraph } = Typography;
const Component: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const {
    title,
    options = [],
    isVertical,
    value,
  } = {
    ...QuestionRadioDefaultProps,
    ...props,
  };
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options.map((option) =>
            ((opt) => {
              const { value, text } = opt;
              return (
                <Radio key={value} value={value}>
                  {text}
                </Radio>
              );
            })(option),
          )}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;
