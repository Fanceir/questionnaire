import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
// 各个组件的类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType;

//统一组件的配置的type
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

//全部组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
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
];
