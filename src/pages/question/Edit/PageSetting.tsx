/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-23 15:40:12
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 23:02:51
 * @FilePath: /questionnaire/src/pages/question/Edit/PageSetting.tsx
 * @Description:
 */
import { FC, useEffect } from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import useGetPageInfo from "@/Hooks/useGetPageInfo";
import { resetPageInfo } from "../../../store/pageInfoReducer";
const { TextArea } = Input;
const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo, form]);

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="输入 CSS 样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="输入 JS 脚本代码..." />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
