import { useState } from "react";
import { IList } from "@/interfaces/IListing";
import { AxiosResponse } from "axios";

const useApi = ({
  apiFunc,
}: {
  apiFunc(): Promise<AxiosResponse<any, any>>;
}) => {
  const [data, setData] = useState<IList[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function request() {
    setLoading(true);
    try {
      const res = await apiFunc();
      if (res.data) {
        setData(res.data);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { request, data, error, isLoading };
};

export default useApi;
