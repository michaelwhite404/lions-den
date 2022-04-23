import React, { ReactNode, useCallback, useState } from "react";
import { RefreshControl, ScrollView, ScrollViewProps, StyleSheet } from "react-native";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

interface RefreshScrollViewProps
  extends Omit<ScrollViewProps, "refreshControl" | "showsVerticalScrollIndicator"> {
  children: ReactNode;
  onRefresh?: () => void;
}

export default function RefreshScrollView({
  children,
  onRefresh,
  ...props
}: RefreshScrollViewProps) {
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      onRefresh?.();
    });
  }, []);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
