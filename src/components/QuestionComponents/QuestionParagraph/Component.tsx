/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-21 12:45:07
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-21 23:01:13
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionParagraph/Component.tsx
 * @Description:  段落题组件
 */
import { FC } from "react";
import {
  QuestionParagraphDefaultPropsType,
  QuestionParagraphPropsType,
} from "./interface";
import { Typography } from "antd";
const { Paragraph } = Typography;
const Component: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text = "", isCenter = false } = {
    ...QuestionParagraphDefaultPropsType,
    ...props,
  };
  const textList = text.split("\n");

  return (
    <Paragraph
      style={{ textAlign: isCenter ? "center" : "left", marginBottom: 0 }}
    >
      {textList.map((t, index) => (
        <span key={index}>
          {t}
          <br />
        </span>
      ))}
    </Paragraph>
  );
};

export default Component;
