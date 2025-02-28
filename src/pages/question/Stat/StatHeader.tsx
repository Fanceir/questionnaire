import { FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./StatHeader.module.scss";
import {
  Button,
  Input,
  InputRef,
  message,
  Popover,
  QRCode,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { CopyOutlined, LeftOutlined } from "@ant-design/icons";
import useGetPageInfo from "@/Hooks/useGetPageInfo";

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { Title } = Typography;
  const { title, isPublished } = useGetPageInfo();

  //拷贝连接
  const urlInputRef = useRef<InputRef>(null);
  function copyLink() {
    const elem = urlInputRef.current;
    if (elem == null) return;

    // 获取要复制的文本
    const textToCopy = elem.input?.value || "";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        message.success("拷贝成功");
      })
      .catch((err) => {
        message.error("拷贝失败");
        console.error("无法复制文本: ", err);
      });
  }
  function genLinkAndQRcode() {
    if (!isPublished) return null;
    const url = `http://localhost:3000/question/${id}`;
    //拼接url 参考c端的要求

    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={80} />
      </div>
    );
    return (
      <Space>
        <Input value={url} style={{ width: "300px" }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copyLink}></Button>
        </Tooltip>
        <Popover content={QRCodeElem} trigger="hover">
          <Button>二维码</Button>
        </Popover>
      </Space>
    );
  }
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRcode()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
