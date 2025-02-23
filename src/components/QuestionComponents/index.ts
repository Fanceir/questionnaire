/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-16 21:10:18
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 14:23:43
 * @FilePath: /questionnaire/src/components/QuestionComponents/index.ts
 * @Description: 组件配置
 */
import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, {
  QuestionParagraphPropsType,
} from "./QuestionParagraph";
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextAreaConf, {
  QuestionTextAreaPropsType,
} from "./QuestionTextArea";
import QuestionRadioConf, { QuestionRadioPropsType } from "./QuestionRadio";
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
} from "./QuestionCheckbox";
// 各个组件的类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextAreaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

//统一组件的配置的type
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

//全部组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextAreaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

// 根据组件类型获取组件配置
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}

//组件分组
export const componentConfGroup = [
  {
    groupId: "text",
    groupName: "文本显示",
    components: [QuestionTitleConf, QuestionInfoConf, QuestionParagraphConf],
  },
  {
    groupId: "input",
    groupName: "用户输入",
    components: [QuestionInputConf, QuestionTextAreaConf],
  },
  {
    groupId: "radio",
    groupName: "用户选择",
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];
