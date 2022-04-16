import React, { useState, useEffect, ReactNode } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SelectItem from "./SelectItem";

interface MultiSelectListProps {
  data: any[];
  onCheckboxPress?: (selectedItems: MultiSelectListProps["data"]) => void;
  renderItem?: (item: any) => ReactNode;
}

interface ListItem {
  [x: string]: any;
  selected: boolean;
}

export default function MultiSelectList({
  data,
  onCheckboxPress,
  renderItem,
}: MultiSelectListProps) {
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    setList(data.map((obj) => ({ ...obj, selected: false })));
  }, []);

  const handleCheckboxPress = (checked: boolean, index: number) => {
    const selectedList: MultiSelectListProps["data"] = [];
    const newList = list.map((item, itemIndex) => {
      if (itemIndex === index) item.selected = !item.selected;
      if (item.selected) {
        const { selected, ...data } = item;
        selectedList.push(data);
      }
      return item;
    });
    setList(newList);
    onCheckboxPress?.(selectedList);
  };

  return (
    <FlatList
      data={list}
      renderItem={(props) => (
        <SelectItem onPress={(checked) => handleCheckboxPress(checked, props.index)}>
          <Text>{renderItem?.(props.item)}</Text>
        </SelectItem>
      )}
    />
  );
}

const styles = StyleSheet.create({});
