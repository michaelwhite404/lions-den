import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AccountScreen, HomeScreen, PastScreen } from "./src/screens";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import "react-native-reanimated";

interface RootStackParams {
  Home: undefined;
  Past: undefined;
  Account: undefined;
  [x: string]: undefined;
}

export default function App() {
  const RootStack = createBottomTabNavigator<RootStackParams>();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          tabBarActiveTintColor: "dodgerblue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="ios-add" size={30} color={"#0a84ff"} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
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
