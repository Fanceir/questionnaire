import useLoadQuestionData from "@/Hooks/useLoadQuestionData";
import { FC } from "react";
const Edit: FC = () => {
  const { loading, data: questionData } = useLoadQuestionData();
  return (
    <div>
      <p>Edit Page</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(questionData)}</p>}
    </div>
  );
};
export default Edit;
