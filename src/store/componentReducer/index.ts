import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "@/components/QuestionComponents";
import { produce } from "immer";
import { getNextSelectedId, insertNewComponent } from "./utils";
import cloneDeep from "lodash.clonedeep";
import { arrayMove } from "@dnd-kit/sortable";
export type ComponentInfoType = {
  fe_id: string; //点击组件的时候是前端生成的id
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};
export type ComponentStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};
const INIT_STATE: ComponentStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
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
      insertNewComponent(draft, newComponent);
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

    //锁定和解锁组件
    toggleComponentLock: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      },
    ),

    //复制当前选中的组件
    copySelectedComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const curComp = componentList.find((c) => c.fe_id === selectedId);
      if (curComp == null) return;
      if (curComp) {
        draft.copiedComponent = cloneDeep(curComp);
      }
    }),

    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;
      const newComponent = cloneDeep(copiedComponent);
      newComponent.fe_id = nanoid();
      insertNewComponent(draft, newComponent);
    }),

    //选中上一个
    selectPrevComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);
      if (index < 0) return;
      if (index === 0) return;
      draft.selectedId = componentList[index - 1].fe_id;
    }),

    //选中下一个
    selectNextComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);
      if (index < 0) return;
      if (index === componentList.length - 1) return;
      draft.selectedId = componentList[index + 1].fe_id;
    }),

    //修改组件标题
    changeComponentTitle: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; title: string }>,
      ) => {
        const { fe_id, title } = action.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.title = title;
        }
      },
    ),

    //移动组件位置
    moveComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>,
      ) => {
        const { componentList: curComponentList } = draft;
        const { oldIndex, newIndex } = action.payload;
        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex);
      },
    ),

    //TODO: 撤销重做
  },
});
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentSlice.actions;
export default componentSlice.reducer;
