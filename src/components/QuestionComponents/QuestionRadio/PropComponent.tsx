/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-22 21:58:46
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-22 23:15:54
 * @FilePath: /questionnaire/src/components/QuestionComponents/QuestionRadio/PropComponent.tsx
 * @Description: 选择题组件的属性组件
 */
import { FC, useEffect } from "react";
import { OptionType, QuestionRadioPropsType } from "./interface";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";
const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType,
) => {
  const [form] = Form.useForm();
  const { title, isVertical, value, disabled, options = [], onChange } = props;

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options });
  }, [form, title, isVertical, value, options]);
  function handleValuesChange() {
    if (onChange == null) return;
    // 触发 onChange 函数
    const newValues = form.getFieldsValue() as QuestionRadioPropsType;

    if (newValues.options) {
      // 需要清除 text undefined 的选项
      newValues.options = newValues.options.filter(
        (opt) => !(opt.text == null),
      );
    }

    const { options = [] } = newValues;
    options.forEach((opt) => {
      if (opt.value) return;
      opt.value = nanoid(5); // 补齐 opt value
    });

    onChange(newValues);
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
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

      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项（可删除） */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) num++;
                              // 记录 text 相同的个数，预期只有 1 个
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(
                              new Error("和其他选项重复了"),
                            );
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>

                    {/* 当前选项 删除按钮 */}
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                );
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "" })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({
            value,
            label: text || "",
          }))}
        ></Select>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
