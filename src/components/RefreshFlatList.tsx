import React, { ReactNode, useCallback, useState } from "react";
import { FlatList, FlatListProps, RefreshControl } from "react-native";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

interface RefreshFlatListProps<ItemT>
  extends Omit<
    FlatListProps<ItemT>,
    "scrollEnabled" | "refreshControl" | "showsVerticalScrollIndicator"
  > {
  onRefresh?: () => void;
}

export default function RefreshFlatList<T>({ onRefresh, ...props }: RefreshFlatListProps<T>) {
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      onRefresh?.();
    });
  }, []);

  return (
    <FlatList
      {...props}
      scrollEnabled
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
