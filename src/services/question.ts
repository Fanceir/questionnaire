import axios, { ResDataType } from "@/services/ajax";

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  // page: number
  // pageSize: number
};
//获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = "/api/question/";
  return axios.post(url);
}

export async function getQuestionListService(
  opt: Partial<SearchOption> = {},
): Promise<ResDataType> {
  const url = "/api/question/";
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}
