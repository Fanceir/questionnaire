import { FC, useEffect, useState, useRef, useMemo } from "react";
import styles from "./Common.module.scss";
import { useDebounceFn, useTitle, useRequest } from "ahooks";
import { Button, Empty, Spin, Typography } from "antd";
import { getQuestionListService } from "../../services/question";
import ListSearch from "@/components/ListSearch";
import { useSearchParams } from "react-router-dom";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "@/constant";
import QuestionCard from "@/components/QuestionCard";

const List: FC = () => {
  const { Title } = Typography;
  useTitle("我的问卷");

  const [started, setStarted] = useState(false); //标记是否已经开始加载（防抖有延迟时间）
  const [list, setList] = useState([]); //上滑加载更多全部的数据
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const haveMoreData = list.length < total;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
  const containerRef = useRef<HTMLDivElement>(null);

  //keyword变化时，重新加载数据
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);
  const { run: handleLoad, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || "",
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: listR = [], total } = result;
        setList(list.concat(listR));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );

  //触发加载的函数
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem === null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect === null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        handleLoad();
        setStarted(true);
        //真正加载数据
      }
    },
    { wait: 500 },
  );

  useEffect(() => {
    tryLoadMore();
  }, [searchParams, tryLoadMore]);

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }
    //解绑
    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams, tryLoadMore, haveMoreData]);

  //
  const loadMoreContent = useMemo(() => {
    if (!started || loading) {
      return <Spin />;
    }
    if (total === 0) return <Empty description="暂无数据" />;
    if (haveMoreData) {
      return <Button>加载更多</Button>;
    }
  }, [started, loading, total, haveMoreData]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/*问卷列表 */}
        {list.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContent}</div>
      </div>
    </>
  );
};
export default List;
