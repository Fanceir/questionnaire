/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-23 14:16:06
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 14:22:37
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionCheckbox/index.ts
 * @Description: 复选框组件的配置
 */
import Component from "../QuestionCheckbox/Component";
import PropComponent from "./PropComponent";
import { QuesitonCheckboxDefaultProps } from "./interface";
export * from "./interface";
export default {
  title: "多选题",
  type: "questionCheckbox",
  Component,
  PropComponent,
  defaultProps: QuesitonCheckboxDefaultProps,
};
