import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
export * from "./interface";
export default {
  title: "标题",
  type: "questionTitle",
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
};
