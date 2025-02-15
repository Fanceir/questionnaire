import useLoadUserData from "@/Hooks/useLoadUserData";
import useNavPage from "@/Hooks/useNavPage";
import { Spin } from "antd";
import { FC } from "react";
import { Outlet } from "react-router-dom";
const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <>
      <div style={{ height: "100vh" }}>
        {waitingUserData ? (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};
export default QuestionLayout;
