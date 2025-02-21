/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-21 12:45:52
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-21 12:49:25
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionParagraph/interface.ts
 * @Description: 段落题组件的类型
 */
export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;

  //用于属性表单 PropsComponent
  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};

export const QuestionParagraphDefaultPropsType: QuestionParagraphPropsType = {
  text: "一行段落",
  isCenter: false,
};
