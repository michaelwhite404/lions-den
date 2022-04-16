import { useEffect, useState } from "react";

export default function useFilter<T>(data: T[], key: keyof T) {
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => getData(), [filter]);

  const getData = () => {
    if (filter === "") {
      setFilteredData([]);
      return;
    }
    setFilteredData(
      data.filter((item) => String(item[key]).toLowerCase().includes(filter.toLowerCase()))
    );
  };

  return { data: filteredData, filter, setFilter };
}
