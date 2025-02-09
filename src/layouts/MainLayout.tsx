import { FC } from "react";
import { Outlet } from "react-router-dom";
const MainLayout: FC = () => {
  return (
    <>
      <div>header</div>
      <div> content</div>
      <Outlet />
      <div>MainLayOut footer</div>
    </>
  );
};
export default MainLayout;
