import { FC } from "react";
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from "./interface";
import { Typography } from "antd";
const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
) => {
  const { Title } = Typography;
  const {
    text = "",
    isCenter = false,
    level = 1,
  } = { ...QuestionTitleDefaultProps, ...props };
  const genFontSize = (level: number) => {
    if (level === 1) return "24px";
    if (level === 2) return "20px";
    if (level === 3) return "16px";
    return "16px";
  };
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        marginBottom: "0",
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};
export default QuestionTitle;
