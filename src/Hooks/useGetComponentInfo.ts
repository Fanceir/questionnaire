/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-16 21:32:42
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 22:05:55
 * @FilePath: /questionnaire/src/Hooks/useGetComponentInfo.ts
 * @Description: 用于获取组件信息的hook
 */
import { StateType } from "@/store";
import { ComponentStateType } from "@/store/componentReducer";
import { useSelector } from "react-redux";
const useGetComponentInfo = () => {
  const components = useSelector<StateType>(
    (state) => state.components,
  ) as ComponentStateType;
  const { componentList = [], selectedId, copiedComponent } = components;

  const selectedComponent = componentList.find(
    (component) => component.fe_id === selectedId,
  );
  return { componentList, selectedId, selectedComponent, copiedComponent };
};
export default useGetComponentInfo;
