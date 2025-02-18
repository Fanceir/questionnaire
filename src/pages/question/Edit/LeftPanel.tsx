import { Tabs } from "antd";
import { FC } from "react";
import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import ComponentLib from "./ComponentLib";
const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: "componentLib",
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: "layers",
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <div>图层</div>,
    },
  ];
  return <Tabs defaultActiveKey="" items={tabsItems} />;
};
export default LeftPanel;
