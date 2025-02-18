import { StateType } from "@/store";
import { ComponentStateType } from "@/store/componentReducer";
import { useSelector } from "react-redux";
const useGetComponentInfo = () => {
  const components = useSelector<StateType>(
    (state) => state.components,
  ) as ComponentStateType;
  const { componentList = [], selectedId } = components;
  return { componentList, selectedId };
};
export default useGetComponentInfo;
