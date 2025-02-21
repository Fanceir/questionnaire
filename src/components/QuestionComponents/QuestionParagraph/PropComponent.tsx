/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-21 12:54:12
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-21 12:59:27
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionParagraph/PropComponent.tsx
 * @Description: 用于属性表单的组件
 */
import { FC, useEffect } from "react";
import { Form, Input, Checkbox } from "antd";
import { QuestionParagraphPropsType } from "./interface";

const { TextArea } = Input;

const PropComponent: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();

  // 初始化表单,props改变时更新表单
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
    // eslint-disable-next-line
  }, [text, isCenter]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: "请输入段落内容" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
