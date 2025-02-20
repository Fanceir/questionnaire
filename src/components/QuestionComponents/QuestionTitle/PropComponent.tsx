/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-19 14:01:58
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 21:51:30
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionTitle/PropComponent.tsx
 * @Description: 这个是标题组件的属性设置组件
 */
import { FC, useEffect } from "react";
import { Form, Input, Checkbox, Select } from "antd";
import { QuestionTitlePropsType } from "./interface";
const PropComponent: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
) => {
  const { text, level, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter, form]);
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox>居中</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
