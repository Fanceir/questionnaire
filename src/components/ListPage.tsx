import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "@/constant";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
type PropsType = {
  total: number;
};
const ListPage: FC<PropsType> = (props: PropsType) => {
  const total = props.total;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const [usp, setUsp] = useSearchParams();
  //从url参数中找到page pagesize 并且同步到state
  useEffect(() => {
    const page = parseInt(usp.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(usp.get(LIST_PAGE_SIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [usp]);
  //手动跳转，当我们手动跳转的时候，需要更新url参数
  const onChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize || LIST_PAGE_SIZE);
    setUsp({
      ...Object.fromEntries(usp.entries()),
      [LIST_PAGE_PARAM_KEY]: page.toString(),
      [LIST_PAGE_SIZE_PARAM_KEY]: pageSize.toString(),
    });
  };
  return (
    <Pagination
      total={total}
      current={current}
      pageSize={pageSize}
      onChange={onChange}
      align="center"
    />
  );
};
export default ListPage;
