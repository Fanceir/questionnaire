/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-22 19:36:14
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-22 21:59:43
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionRadio/interface.ts
 * @Description: 选择题组件接口
 */
export type OptionType = {
  value: string;
  text: string;
};
export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;

  //PropComponent
  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
};
export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: "单选题",
  isVertical: false,
  options: [
    { value: "item1", text: "选项1" },
    { value: "item2", text: "选项2" },
    { value: "item3", text: "选项3" },
  ],
  value: "",
};

export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
