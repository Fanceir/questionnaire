import { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "@/constant";
const ListSearch: FC = () => {
  const { Search } = Input;
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  //获取url参数并设置input value
  const [params] = useSearchParams();
  useEffect(() => {
    const newValues = params.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(newValues);
  }, [params]);

  const handleSearch = (value: string) => {
    // 跳转 增加参数
    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  };
  return (
    <div>
      <Search
        size="large"
        style={{ width: "260px" }}
        onSearch={handleSearch}
        placeholder="输入关键字"
        value={value}
        onChange={handleChange}
        allowClear
      />
    </div>
  );
};
export default ListSearch;
