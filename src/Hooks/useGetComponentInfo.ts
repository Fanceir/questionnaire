import { StateType } from "@/store";
import { ComponentStateType } from "@/store/componentReducer";
import { useSelector } from "react-redux";
const useGetComponentInfo = () => {
  const components = useSelector<StateType>(
    (state) => state.components,
  ) as ComponentStateType;
  const { componentList = [], selectedId } = components;

  const selectedComponent = componentList.find(
    (component) => component.fe_id === selectedId,
  );
  return { componentList, selectedId, selectedComponent };
};
export default useGetComponentInfo;
