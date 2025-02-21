/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-21 23:05:30
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-21 23:29:55
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionInfo/Component.tsx
 * @Description:  信息题组件
 */
import { FC } from "react";
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from "./interface";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc } = { ...QuestionInfoDefaultProps, ...props };

  const descTextList = desc!.split("\n");

  return (
    <div>
      <Title style={{ fontSize: 24 }}>{title}</Title>
      <Paragraph>
        {descTextList.map((t, index) => (
          <span key={index}>
            {t}
            <br />
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default Component;
