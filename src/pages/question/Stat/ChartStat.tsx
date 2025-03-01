import { FC, useEffect, useState } from "react";
import { Typography } from "antd";
import { getComponentStatService } from "@/services/stat";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";

const { Title } = Typography;
type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};
const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { id = "" } = useParams();
  const { selectedComponentId } = props;
  const [stat, setStat] = useState([]);
  const { run } = useRequest(
    async (questionId, componentId) =>
      await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat);
      },
    },
  );
  useEffect(() => {
    if (selectedComponentId) {
      run(id, selectedComponentId);
    }
  }, [id, selectedComponentId, run]);

  function genStatElem() {
    if (!selectedComponentId) {
      return <div>请选择组件</div>;
    }
    return <div>{JSON.stringify(stat)}</div>;
  }
  return (
    <>
      <Title level={2}>图表统计</Title>
      <div>{genStatElem()}</div>
    </>
  );
};
export default ChartStat;
