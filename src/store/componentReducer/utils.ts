/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-19 22:20:33
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 22:09:55
 * @FilePath: /questionnaire/src/store/componentReducer/utils.ts
 * @Description: 这是一些在处理redux时候的工具函数
 */
import { ComponentInfoType, ComponentStateType } from "./index";

/**
 * 获取下一个selectedId
 * @param fe_id 当前id
 * @param componentList
 * @returns
 */
export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[],
) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) return "";
  //重新计算selectedId
  let newSelectedId = "";
  const length = visibleComponentList.length;
  if (length === 1) {
    newSelectedId = "";
  } else {
    if (index + 1 === length) {
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}

/**
 *
 * @param draft  当前的state
 * @param newComponent  新添加的组件
 */
export function insertNewComponent(
  draft: ComponentStateType,
  newComponent: ComponentInfoType,
) {
  //找到当前的id
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);
  if (index < 0) {
    //未选中任何组件，就在最后添加
    draft.componentList.push(newComponent);
  } else {
    draft.componentList.splice(index + 1, 0, newComponent);
  }
  // 选中新添加的组件
  draft.selectedId = newComponent.fe_id;
}
