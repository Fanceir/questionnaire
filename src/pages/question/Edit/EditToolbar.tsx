/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-19 22:10:38
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 15:24:51
 * @FilePath: /questionnaire/src/pages/question/Edit/EditToolbar.tsx
 * @Description:
 */
import useGetComponentInfo from "@/Hooks/useGetComponentInfo";
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLock,
} from "@/store/componentReducer";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UndoOutlined,
  UpOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const {
    selectedId,
    componentList = [],
    selectedComponent,
    copiedComponent,
  } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex === 0;
  const isLast = selectedIndex === length - 1;
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }
  function handleLock() {
    dispatch(toggleComponentLock({ fe_id: selectedId }));
  }
  function handleCopy() {
    dispatch(copySelectedComponent());
  }
  function handlePaste() {
    dispatch(pasteCopiedComponent());
  }
  function handleUp() {
    if (isFirst) return;
    dispatch(
      moveComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex - 1,
      }),
    );
  }

  function handleDown() {
    if (isLast) return;
    dispatch(
      moveComponent({
        oldIndex: selectedIndex,
        newIndex: selectedIndex + 1,
      }),
    );
  }
  function handleUndo() {
    dispatch(UndoActionCreators.undo());
  }
  function handleRedo() {
    dispatch(UndoActionCreators.redo());
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
        <Tooltip title="复制">
          <Button
            shape="circle"
            icon={<CopyOutlined />}
            onClick={handleCopy}
          ></Button>
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={handlePaste}
            disabled={copiedComponent == null}
          ></Button>
        </Tooltip>
        <Tooltip title="上移">
          <Button
            shape="circle"
            icon={<UpOutlined />}
            onClick={handleUp}
            disabled={isFirst}
          ></Button>
        </Tooltip>
        <Tooltip title="下移">
          <Button
            shape="circle"
            icon={<DownOutlined rotate={180} />}
            onClick={handleDown}
            disabled={isLast}
          ></Button>
        </Tooltip>
        <Tooltip title="撤销">
          <Button
            shape="circle"
            icon={<UndoOutlined rotate={180} />}
            onClick={handleUndo}
          ></Button>
        </Tooltip>
        <Tooltip title="重做">
          <Button
            shape="circle"
            icon={<RedoOutlined rotate={180} />}
            onClick={handleRedo}
          ></Button>
        </Tooltip>
      </Space>
    </>
  );
};
export default EditToolbar;
