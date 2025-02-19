import { Tabs } from "antd";
import { FC } from "react";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: "prop",
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: "layers",
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ];
  return <Tabs defaultActiveKey="prop" items={tabsItems} />;
};
export default RightPanel;
