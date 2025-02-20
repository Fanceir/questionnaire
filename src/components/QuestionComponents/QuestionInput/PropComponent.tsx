/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-19 13:55:43
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 21:50:35
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionInput/PropComponent.tsx
 * @Description: 这个是输入框组件的属性设置组件
 */
import { FC, useEffect } from "react";
import { Form, Input } from "antd";
import { QuestionInputPropsType } from "./interface";

const PropComponent: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType,
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
