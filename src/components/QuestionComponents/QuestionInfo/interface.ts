/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-21 23:06:09
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-21 23:22:10
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionInfo/interface.ts
 * @Description: 信息题组件接口
 */
export type QuestionInfoPropsType = {
  title?: string;
  desc?: string;
  onChange?: (value: QuestionInfoPropsType) => void;
  disabled?: boolean;
};

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: "问卷标题",
  desc: "问卷描述",
};
