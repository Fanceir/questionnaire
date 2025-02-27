/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-15 15:01:08
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 16:17:40
 * @FilePath: /questionnaire/src/store/index.ts
 * @Description: redux的store
 */
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentReducer, { ComponentStateType } from "./componentReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
export type StateType = {
  user: UserStateType;
  components: StateWithHistory<ComponentStateType>; //增加了undo类型
  pageInfo: PageInfoType;
};
export default configureStore({
  reducer: {
    user: userReducer,
    //组件列表的数据（UNDO REDO）
    components: undoable(componentReducer, {
      limit: 20,
      filter: excludeAction([
        "components/resetComponents",
        "components/changeSelectedId",
        "components/selectPrevComponent",
        "components/selectNextComponent",
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
});
