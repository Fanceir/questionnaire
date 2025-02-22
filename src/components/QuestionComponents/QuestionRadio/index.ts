/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-22 21:56:43
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-22 22:08:07
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionRadio/index.ts
 * @Description: 问卷的radio组件 使用antd的Radio组件
 */
import Component from "./Component";
import { QuestionRadioDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
export * from "./interface";
export default {
  title: "单选",
  type: "questionRadio",
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
};
