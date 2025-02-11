import { FC, useEffect } from "react";
import { useTitle } from "ahooks";
import styles from "./Login.module.scss";
import { Typography, Space, Form, Input, Button, Checkbox } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { REGISTER_PATHNAME } from "../router";
import { Link } from "react-router-dom";

const { Title } = Typography;
const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";
const rememberUser = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
};
const deleteUserFromStorage = () => {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};
const getUserFromStorage = () => {
  const username = localStorage.getItem(USERNAME_KEY);
  const password = localStorage.getItem(PASSWORD_KEY);
  return { username, password };
};
const Login: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log("Success:", values);
    const { username, password } = values || {};
    if (values.remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };
  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = getUserFromStorage();
    form.setFieldsValue({ username, password });
  }, [form]);
  useTitle("Easy问卷 - 登录");
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}> 用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 6,
                max: 20,
                message: "用户名长度应在6-20之间",
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "用户名只能包含字母、数字和下划线",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 6, span: 16 }}
            valuePropName="checked"
            name="remember"
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
