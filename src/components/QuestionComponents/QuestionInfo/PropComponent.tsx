/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-21 23:13:26
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-21 23:19:36
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionInfo/PropComponent.tsx
 * @Description: 信息题组件属性
 */
import { FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./interface";
import { Form, Input } from "antd";

const PropComponent: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType,
) => {
  const { title, desc, onChange, disabled } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc, form]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="描述"
        name="desc"
        rules={[{ required: true, message: "请输入描述" }]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
