import useLoadUserData from "@/Hooks/useLoadUserData";
import useNavPage from "@/Hooks/useNavPage";
import { FC } from "react";
import { Outlet } from "react-router-dom";
const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <>
      <div>QuestionLayout</div>
      <div>{!waitingUserData && <Outlet />}</div>
    </>
  );
};
export default QuestionLayout;
