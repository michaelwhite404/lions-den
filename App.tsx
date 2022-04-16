import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AccountScreen, HomeScreen, PastScreen, SelectStudentsScreen } from "./src/screens";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import "react-native-reanimated";

interface RootStackParams {
  MainStack: undefined;
  Past: undefined;
  Account: undefined;
  [x: string]: undefined;
}

export type MainStackParams = {
  Home: undefined;
  SelectStudents: undefined;
};

export default function App() {
  const RootStack = createBottomTabNavigator<RootStackParams>();
  const MainStack = createNativeStackNavigator<MainStackParams>();

  const MainScreenStack = () => {
    return (
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="ios-add" size={30} color={"#0a84ff"} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            ),
          }}
        />
        <MainStack.Screen name="SelectStudents" component={SelectStudentsScreen} />
      </MainStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStack.Navigator
        initialRouteName="Main"
        screenOptions={() => ({
          tabBarActiveTintColor: "dodgerblue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <RootStack.Screen
          name="Main"
          component={MainScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
            headerShown: false,
            tabBarLabel: "Home",
          }}
        />
        <RootStack.Screen
          name="Past"
          component={PastScreen}
          options={{
            headerTitle: "Past Sessions",
            tabBarLabel: "Past Sessions",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-play-skip-back-outline" size={size} color={color} />
            ),
          }}
        />
        <RootStack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerTitle: "Account",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-person-outline" size={size} color={color} />
            ),
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
