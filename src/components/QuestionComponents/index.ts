import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
// 各个组件的类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType;

export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
];
export function getComponentConfByList(type: string) {
  return componentConfList.find((c) => c.type === type);
}
