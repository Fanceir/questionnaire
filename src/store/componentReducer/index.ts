import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "@/components/QuestionComponents";
import { produce } from "immer";
import { getNextSelectedId } from "./utils";
export type ComponentInfoType = {
  fe_id: string; //点击组件的时候是前端生成的id
  type: string;
  title: string;
  isHidden?: boolean;
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

    //删除选中的组件
    removeSelectedComponent: produce((draft: ComponentStateType) => {
      const { selectedId: removeId, componentList } = draft;

      //重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList);
      draft.selectedId = newSelectedId;

      const index = componentList.findIndex((c) => c.fe_id === removeId);
      componentList.splice(index, 1);
    }),

    //隐藏和显示组件
    changeComponentHidden: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
      ) => {
        const { componentList } = draft;
        const { fe_id, isHidden } = action.payload;

        //找到当前的id
        let newSelectedId = "";
        if (isHidden) {
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;

        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isHidden = isHidden;
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
  removeSelectedComponent,
  changeComponentHidden,
} = componentSlice.actions;
export default componentSlice.reducer;
