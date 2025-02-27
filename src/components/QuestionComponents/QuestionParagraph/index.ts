/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-21 12:45:00
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-21 23:31:16
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionParagraph/index.ts
 * @Description: 段落组件配置
 */
import Component from "./Component";
import { QuestionParagraphDefaultPropsType } from "./interface";
import PropComponent from "./PropComponent";
export * from "./interface";

export default {
  title: "段落",
  type: "questionParagraph",
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultPropsType,
};
