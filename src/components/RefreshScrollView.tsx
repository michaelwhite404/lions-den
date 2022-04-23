import React, { ReactNode, useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

interface RefreshScrollViewProps {
  children: ReactNode;
  onRefresh?: () => void;
}

export default function RefreshScrollView({ children, onRefresh }: RefreshScrollViewProps) {
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
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
