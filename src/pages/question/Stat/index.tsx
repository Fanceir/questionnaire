import { FC } from "react";
import useLoadQuestionData from "@/Hooks/useLoadQuestionData";
const Stat: FC = () => {
  const { loading, data: questionData } = useLoadQuestionData();
  return (
    <div>
      <p>Stat Page</p>

      {loading ? <p>loading...</p> : <p>{JSON.stringify(questionData)}</p>}
    </div>
  );
};
export default Stat;
