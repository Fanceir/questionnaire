import { ComponentInfoType } from "./index";

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
