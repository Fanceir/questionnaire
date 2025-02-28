import { FC } from "react";
import EditCanvas from "./EditCanvas";
import useLoadQuestionData from "@/Hooks/useLoadQuestionData";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "@/store/componentReducer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";
import { useTitle } from "ahooks";
import styles from "./index.module.scss";
const Edit: FC = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();
  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }
  useTitle(`编辑问卷 - 问卷编辑器`);
  return (
    <div className={styles.container}>
      <div>
        <EditHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
