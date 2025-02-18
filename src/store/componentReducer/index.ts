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

    // 添加新组件
    addComponent: (
      draft: ComponentStateType,
      action: PayloadAction<ComponentInfoType>,
    ) => {
      const newComponent = action.payload;

      //找到当前的id
      const { selectedId } = draft;
      const index = draft.componentList.findIndex(
        (c) => c.fe_id === selectedId,
      );
      if (index < 0) {
        //未选中任何组件，就在最后添加
        draft.componentList.push(newComponent);
      } else {
        draft.componentList.splice(index + 1, 0, newComponent);
      }
      // 选中新添加的组件
      draft.selectedId = newComponent.fe_id;
    },
  },
});
export const { resetComponents, changeSelectedId, addComponent } =
  componentSlice.actions;
export default componentSlice.reducer;
