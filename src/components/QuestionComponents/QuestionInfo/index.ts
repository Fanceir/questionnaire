/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-21 23:20:57
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-21 23:22:32
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionInfo/index.ts
 * @Description:问卷的info组件
 */
import Component from "./Component";
import { QuestionInfoDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
export * from "./interface";
export default {
  title: "问卷信息",
  type: "questionInfo",
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
};
