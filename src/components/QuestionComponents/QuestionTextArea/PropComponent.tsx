/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-22 19:23:41
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-22 19:23:49
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionTextArea/PropComponent.tsx
 * @Description: 这个是文本域组件的属性设置组件
 */

import { FC, useEffect } from "react";
import { Form, Input } from "antd";
import { QuestionTextAreaPropsType } from "./interface";

const PropComponent: FC<QuestionTextAreaPropsType> = (
  props: QuestionTextAreaPropsType,
) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder, form]);

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="提示" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
