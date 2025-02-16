// input 组件的配置

import Component from "./Component";
import { QuestionInputDefaultProps } from "./interface";
export * from "./interface";

//组件的配置
export default {
  title: "输入框",
  type: "questionInput", //注意和后端统一好
  Component,
  defaultProps: QuestionInputDefaultProps,
};
