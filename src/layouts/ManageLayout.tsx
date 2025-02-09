import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./ManageLayout.module.scss";
const ManageLayout: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>ManageLayout</p>
          <button>创建问卷</button>
          <a>我的问卷</a>
          <a>星标问卷</a>
          <a>回收站</a>
        </div>
        <div className={styles.right}></div>
      </div>
      <div>
        <Outlet />
      </div>

      <div>ManageLayOut footer</div>
    </>
  );
};
export default ManageLayout;
