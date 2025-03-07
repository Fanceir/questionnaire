import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ManageLayout from "@/layouts/ManageLayout";
import QuestionLayout from "@/layouts/QuestionLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import List from "@/pages/manage/List";
import Star from "@/pages/manage/Star";
import Trash from "@/pages/manage/Trash";

//拆分bundle 优化首页
import { lazy } from "react";
const Edit = lazy(() => import("@/pages/question/Edit"));
const Stat = lazy(() => import("@/pages/question/Stat"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/manage/list" />,
          },
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      // {
      //   path: '*', // 404 路由配置，都写在最后（兜底）
      //   element: <NotFound />
      // }
    ],
  },
  {
    path: "/question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id", // statistic 统计
        element: <Stat />,
      },
    ],
  },
  {
    path: "*", // 404 路由配置，都写在最后（兜底）
    element: <NotFound />,
  },
]);

export default router;

//------  常用的常量
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const HOME_PATHNAME = "/";
export const MANAGE_INDEX_PATHNAME = "/manage";

export function isLoginOrRegister(pathname: string) {
  return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname);
}
export function isNoNeedUserInfo(pathname: string) {
  return [LOGIN_PATHNAME, REGISTER_PATHNAME, HOME_PATHNAME].includes(pathname);
}
