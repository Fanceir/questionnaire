/*
 * @Author: Fanceir fx_official@outlook.com
 * @Date: 2025-02-15 15:01:08
 * @LastEditors: Fanceir fx_official@outlook.com
 * @LastEditTime: 2025-02-20 22:02:49
 * @FilePath: /questionnaire/src/Hooks/useLoadQuestionData.ts
 * @Description:  用于加载问卷数据的hook
 */
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

  // 获取默认的selectedId

  //根据获取的data 设置redux
  useEffect(() => {
    if (!data) return;
    const { /*title = ""*/ componentList = [] } = data;

    // 获取默认的selectedId
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; // 默认选中第一个组件
    }
    // 把问卷的信息设置到redux中
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null }),
    );
  }, [data, dispatch]);
  useEffect(() => {
    run(id);
  }, [id, run]);
  return { loading, error };
}
export default useLoadQuestionData;
