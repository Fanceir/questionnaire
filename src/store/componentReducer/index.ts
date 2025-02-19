import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "@/components/QuestionComponents";
import { produce } from "immer";
export type ComponentInfoType = {
  fe_id: string; //点击组件的时候是前端生成的id
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
    changeSelectedId: produce(
      (draft: ComponentStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      },
    ),

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
    changeComponentProps: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
      ) => {
        const { fe_id, newProps } = action.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      },
    ),
  },
});
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
} = componentSlice.actions;
export default componentSlice.reducer;
