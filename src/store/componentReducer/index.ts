import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "@/components/QuestionComponents";
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};
export type ComponentStateType = {
  componentList: Array<ComponentInfoType>;
};
const INIT_STATE: ComponentStateType = {
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
  },
});
export const { resetComponents } = componentSlice.actions;
export default componentSlice.reducer;
