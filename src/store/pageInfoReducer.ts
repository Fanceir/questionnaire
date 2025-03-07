/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-23 16:09:59
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-23 16:26:09
 * @FilePath: /questionnaire/src/store/pageInfoReducer.ts
 * @Description:  页面属性的reducer
 */
import { produce } from "immer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { produce } from "immer";
export type PageInfoType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};

const INIT_STATE: PageInfoType = {
  title: "",
  desc: "",
  js: "",
  css: "",
};

const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (
      state: PageInfoType,
      action: PayloadAction<PageInfoType>,
    ) => {
      state = action.payload;
      return state;
    },
    changePageTitle: produce(
      (draft: PageInfoType, action: PayloadAction<string>) => {
        draft.title = action.payload;
      },
    ),
  },
});
export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
