import { FC } from "react";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import useLoadQuestionData from "@/Hooks/useLoadQuestionData";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "@/store/componentReducer";
import LeftPanel from "./LeftPanel";

const Edit: FC = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();
  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }
  return (
    <div className={styles.container}>
      <div>header</div>
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
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
