/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-18 16:53:24
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 14:54:46
 * @FilePath: /questionnaire/src/pages/question/Edit/LeftPanel.tsx
 * @Description:   左侧面板
 */
import { Tabs } from "antd";
import { FC } from "react";
import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import ComponentLib from "./ComponentLib";
import Layers from "./Layers";
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
      children: (
        <div>
          <Layers />
        </div>
      ),
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};
export default LeftPanel;
