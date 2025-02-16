import { getQuestionService } from "@/services/question";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "@/store/componentReducer";
function useLoadQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("id is required");
      const data = await getQuestionService(id);
      return data;
    },
    { manual: true },
  );
  //根据获取的data 设置redux
  useEffect(() => {
    if (!data) return;
    const { /*title = ""*/ componentList = [] } = data;
    // 把问卷的信息设置到redux中
    dispatch(resetComponents({ componentList }));
  }, [data, dispatch]);
  useEffect(() => {
    run(id);
  }, [id, run]);
  return { loading, error };
}
export default useLoadQuestionData;
