import axios, { AxiosError, isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { AxiosApiResponse, ErrorType, OptionsType } from "../types/types";

const useAxios = <ApiResponse = AxiosApiResponse>(
  url: string,
  dependencies: any[] = [],
  options: OptionsType = { method: "GET" }
) => {
  const { execute, refetch, reset, ...state } = useAxiosInternal<ApiResponse>(
    url,
    options,
    dependencies,
    true
  );
  useEffect(() => {
    execute();
  }, dependencies);

  return state;
};

const useAxiosFn = <ApiResponse>(
  url: string,
  options: OptionsType = { method: "GET" },
  dependencies: any[] = []
) => {
  return useAxiosInternal<ApiResponse>(url, options, dependencies, false);
};

const useAxiosInternal = <ApiResponse>(
  url: string,
  options: Object,
  dependencies: any[],
  initialLoading: true | false
) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<null | ErrorType>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios(url, options);
      setData(data);
    } catch (error) {
      let errorObj: ErrorType = {
        status: (error as AxiosError).response?.status,
        message: isAxiosError(error)
          ? error.response?.data.message
          : "Some went wrong!",
      };

      setError(errorObj);
    } finally {
      setLoading(false);
    }
  }, dependencies);
  const refetch = () => {
    setLoading(true);
    setData(null);
  };
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, loading, refetch, error, execute, reset };
};

export { useAxios, useAxiosFn };
