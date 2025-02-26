import { ChangeEvent, FC, useState } from "react";
import styles from "./EditHeader.module.scss";
import { Button, Typography, Space, Input, message } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "@/Hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "@/store/pageInfoReducer";
import useGetComponentInfo from "@/Hooks/useGetComponentInfo";
import { useKeyPress, useRequest, useDebounceEffect } from "ahooks";
import { updateQuestionService } from "@/services/question";
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

//保存按钮
const SaveButton: FC = () => {
  //存pageInfo 和 components
  const { id } = useParams();
  const { componentList } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  //快捷键
  useKeyPress(["ctrl.s", "meta.s"], (event) => {
    event.preventDefault();
    if (!loading) handleSave();
  });

  //自动保存，监听保存的变化，使用debounce防抖
  useDebounceEffect(
    () => {
      handleSave();
    },
    [componentList, pageInfo],
    { wait: 1000 },
  );
  const { loading, run: handleSave } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        components: componentList,
      });
    },
    {
      manual: true,
    },
  );
  return (
    <Button
      onClick={handleSave}
      icon={loading ? <LoadingOutlined /> : null}
      disabled={loading}
    >
      保存
    </Button>
  );
};

//发布按钮
const PublishButton: FC = () => {
  const { id } = useParams();
  const { componentList } = useGetComponentInfo();
  const pageInfo = useGetComponentInfo();
  const nav = useNavigate();
  const { loading, run: handlePublish } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        components: componentList,
        isPublished: true, //发布
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success("发布成功");
        nav("/question/stat/" + id);
        //发布成功跳转到统计页面
      },
    },
  );
  return (
    <Button type="primary" onClick={handlePublish} disabled={loading}>
      发布
    </Button>
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
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};
export default EditHeader;
