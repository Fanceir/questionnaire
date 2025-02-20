/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-19 22:10:38
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 21:46:13
 * @FilePath: /questionnaire/src/pages/question/Edit/EditToolbar.tsx
 * @Description:
 */
import useGetComponentInfo from "@/Hooks/useGetComponentInfo";
import {
  changeComponentHidden,
  removeSelectedComponent,
  toogleComponentLock,
} from "@/store/componentReducer";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }
  function handleLock() {
    dispatch(toogleComponentLock({ fe_id: selectedId }));
  }
  return (
    <>
      <Space>
        <Tooltip title="删除">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          ></Button>
        </Tooltip>
        <Tooltip title="隐藏">
          <Button
            shape="circle"
            icon={<EyeInvisibleOutlined />}
            onClick={handleHidden}
          ></Button>
        </Tooltip>
        <Tooltip title="锁定">
          <Button
            shape="circle"
            icon={<LockOutlined />}
            onClick={handleLock}
            type={isLocked ? "primary" : "default"}
          ></Button>
        </Tooltip>
      </Space>
    </>
  );
};
export default EditToolbar;
