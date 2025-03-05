/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-23 13:47:04
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 14:10:32
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionCheckbox/interface.ts
 * @Description: checkbox组件的接口
 */
export type OptionType = {
  value: string;
  text: string;
  checked: boolean;
};
export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];

  // 用于PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
};
export const QuesitonCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: "多选标题",
  isVertical: false,
  list: [
    { value: "item1", text: "选项1", checked: false },
    { value: "item2", text: "选项2", checked: false },
    { value: "item3", text: "选项3", checked: false },
  ],
};
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
