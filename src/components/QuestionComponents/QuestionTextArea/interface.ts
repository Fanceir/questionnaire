export type QuestionTextAreaPropsType = {
  title?: string;
  placeholder?: string;
  onChange?: (newPorps: QuestionTextAreaPropsType) => void;
  disabled?: boolean;
};
export const QuestionTextAreaDefaultProps: QuestionTextAreaPropsType = {
  title: "输入框标题",
  placeholder: "请输入内容",
};
