/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-16 21:10:18
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-22 19:26:57
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
// 各个组件的类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextAreaPropsType;

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
    components: [QuestionTitleConf],
  },
  {
    groupId: "input",
    groupName: "文本输入",
    components: [QuestionInputConf],
  },
  {
    groupId: "paragraph",
    groupName: "段落",
    components: [QuestionParagraphConf],
  },
  {
    groupId: "info",
    groupName: "信息",
    components: [QuestionInfoConf],
  },
  {
    groupId: "textarea",
    groupName: "多行输入",
    components: [QuestionTextAreaConf],
  },
];
