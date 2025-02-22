// 问卷多行输入

import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTextAreaDefaultProps } from "./interface";
export * from "./interface";

//组件的配置
export default {
  title: "输入框",
  type: "questionTextarea", //注意和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionTextAreaDefaultProps,
};
