import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";

import { useSocket } from "@/components/providers/socket-provider";

type ChatQueryProps = {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
};

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: async ({ pageParam }) => {
        const url = qs.stringifyUrl(
          {
            url: apiUrl,
            query: {
              cursor: pageParam,
              [paramKey]: paramValue,
            },
          },
          { skipNull: true },
        );
        const response = await fetch(url);
        return response.json();
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
      refetchInterval: isConnected ? false : 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
