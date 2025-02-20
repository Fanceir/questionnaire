/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-19 14:16:44
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 21:53:10
 * @FilePath: /questionnaire/src/pages/question/Edit/ComponentProp.tsx
 * @Description: 组件右侧属性设置
 */
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
  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConf = getComponentConfByType(type);

  if (componentConf == null) return <NoProp />;

  const { PropComponent } = componentConf;
  //修改属性
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }
  return (
    <PropComponent
      {...props}
      onChange={changeProps}
      disabled={isLocked || isHidden}
    />
  );
};

export default ComponentProp;
