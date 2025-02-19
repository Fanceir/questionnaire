import { FC } from "react";
import useGetComponentInfo from "@/Hooks/useGetComponentInfo";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "@/components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "@/store/componentReducer";
const NoProp = () => {
  return <div>暂无属性</div>;
};
const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  //未选中的时候
  const { selectedComponent } = useGetComponentInfo();
  if (!selectedComponent) return <NoProp />;

  //获取组件配置
  const { type, props } = selectedComponent;
  const componentConf = getComponentConfByType(type);

  if (componentConf == null) return <NoProp />;

  const { PropComponent } = componentConf;
  //修改属性
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }
  return <PropComponent {...props} onChange={changeProps} />;
};

export default ComponentProp;
