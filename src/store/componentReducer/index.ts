import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "@/components/QuestionComponents";
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};
export type ComponentStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};
const INIT_STATE: ComponentStateType = {
  selectedId: "",
  componentList: [],
};
export const componentSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    //reset all components
    resetComponents: (
      _: ComponentStateType,
      action: PayloadAction<ComponentStateType>,
    ) => {
      return action.payload;
    },

    // 修改 selectedid
    changeSelectedId: (
      draft: ComponentStateType,
      action: PayloadAction<string>,
    ) => {
      draft.selectedId = action.payload;
    },
  },
});
export const { resetComponents, changeSelectedId } = componentSlice.actions;
export default componentSlice.reducer;
