import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentReducer, { ComponentStateType } from "./componentReducer";
export type StateType = {
  user: UserStateType;
  components: ComponentStateType;
};
export default configureStore({
  reducer: {
    user: userReducer,
    //组件列表的数据（UNDO REDO）
    components: componentReducer,

    //问卷的信息
  },
});
