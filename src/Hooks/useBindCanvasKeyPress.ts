/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-20 22:15:17
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 22:46:16
 * @FilePath: /questionnaire/src/Hooks/useBindCanvasKeyPress.ts
 * @Description:  绑定画布按键事件
 */
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from "@/store/componentReducer";
import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";

/**
 * 判断activeElement是否是可编辑的元素
 * @returns p
 */
function isActiveElementEditable() {
  const activeEl = document.activeElement;
  if (activeEl === document.body) return true;
  if (activeEl?.matches("div[role='button']")) return true;
  return false;
}
function useBindCanvasKeyPress() {
  //删除组件
  const dispatch = useDispatch();
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementEditable()) return;
    dispatch(removeSelectedComponent());
  });

  //复制
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementEditable()) return;
    dispatch(copySelectedComponent());
  });
  //粘贴
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementEditable()) return;
    dispatch(pasteCopiedComponent());
  });
  //   上移下移选中组件
  useKeyPress(["uparrow"], () => {
    if (!isActiveElementEditable()) return;
    dispatch(selectPrevComponent());
  });

  //   下移选中组件
  useKeyPress(["downarrow"], () => {
    if (!isActiveElementEditable()) return;
    dispatch(selectNextComponent());
  });
  //TODO: 撤销重做
}
export default useBindCanvasKeyPress;
