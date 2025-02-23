/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-19 14:12:09
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 15:48:52
 * @FilePath: /questionnaire/src/pages/question/Edit/RightPanel.tsx
 * @Description:  右侧的页面属性页面设置
 */
import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "@/Hooks/useGetComponentInfo";

enum TabKeys {
  PROP = "prop",
  SETTING = "setting",
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TabKeys.PROP);
  const { selectedId } = useGetComponentInfo();
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TabKeys.PROP);
    } else setActiveKey(TabKeys.SETTING);
  }, [selectedId]);
  const tabsItems = [
    {
      key: TabKeys.PROP,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TabKeys.SETTING,
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: (
        <div>
          <PageSetting />
        </div>
      ),
    },
  ];
  return <Tabs activeKey={activeKey} items={tabsItems} />;
};
export default RightPanel;
