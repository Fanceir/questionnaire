/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-23 22:52:00
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 22:53:12
 * @FilePath: /questionnaire/src/Hooks/useGetPageInfo.ts
 * @Description: 用于获取页面信息的hook
 */
import { StateType } from "@/store";
import { PageInfoType } from "@/store/pageInfoReducer";
import { useSelector } from "react-redux";
function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(
    (state) => state.pageInfo,
  ) as PageInfoType;
  return pageInfo;
}
export default useGetPageInfo;
