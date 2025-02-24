import { ChangeEvent, FC, useState } from "react";
import styles from "./EditHeader.module.scss";
import { Button, Typography, Space, Input } from "antd";
import { EditOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "@/Hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "@/store/pageInfoReducer";
const TitleElem: FC = () => {
  const dispatch = useDispatch();
  const { title } = useGetPageInfo();
  const { Title } = Typography;
  const [editState, SetEditState] = useState(false);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  }

  if (editState)
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => SetEditState(false)}
        onBlur={() => SetEditState(false)}
      ></Input>
    );
  else
    return (
      <Space>
        <Title>{title}</Title>
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() => SetEditState(true)}
        />
      </Space>
    );
};
const EditHeader: FC = () => {
  const nav = useNavigate();
  //编辑器头部
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>{<EditToolbar />}</div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default EditHeader;
