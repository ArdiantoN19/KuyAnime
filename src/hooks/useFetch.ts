"use client";

import { useEffect, useState } from "react";

type OptionsType = {
  [key: string]: string;
};

const useFetch = <T>(url: string, initialValue: T, options: OptionsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [datas, setDatas] = useState<T>(initialValue);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(url, {
        method: options.method || "GET",
        ...options,
      });
      const responseJson = await response.json();
      setIsLoading(false);
      setDatas(responseJson);
    })();
  }, [options, url]);

  return [isLoading, datas];
};

export default useFetch;
