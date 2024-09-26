// This is a pattern for how query should look like, please delete this once there is real APIs
import { demoKeys } from "@/constants/query-keys";
import { queryClient } from "@/providers/query-client-provider/query-client-provider";
import { Demo } from "@/types/demo";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useMockDataList = () => {
  return useQuery({
    queryKey: demoKeys.list(),
    queryFn: () =>
      fetchMessages({
        page: 1,
        pageSize: 10,
      }),
  });
};
export const useMockDataUpdate = (id: string) => {
  return useMutation({
    mutationFn: (requestBody: unknown) => {
      return new Promise((resolve) => {
        resolve({ id, requestBody });
      }).then(() => {
        return {
          id: "A3",
          name: "Hello",
        };
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: demoKeys.all });
    },
  });
};

const MOCK_DATA: Demo[] = [
  {
    id: "A1",
    name: "John",
  },
  {
    id: "A2",
    name: "Jane",
  },
];

type PaginatedData<T> = {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  isLastPage: boolean;
  isFirstPage: boolean;
};
function fetchMessages(params: {
  page: number;
  pageSize: number;
}): Promise<PaginatedData<Demo>> {
  const { page, pageSize } = params;
  return new Promise((resolve) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const min = 1750;
    const max = 2000;
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
    const lastPage = Math.ceil(MOCK_DATA.length / pageSize);
    setTimeout(() => {
      const paginatedData = {
        data: MOCK_DATA.slice(startIndex, endIndex),
        page,
        pageSize,
        totalPages: lastPage,
        isLastPage: page >= lastPage,
        isFirstPage: page === 1,
      };
      resolve(paginatedData);
    }, randomNumber);
  });
}
