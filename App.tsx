import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { AccountScreen, HomeScreen, PastScreen, SelectStudentsScreen } from "./src/screens";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AddDropInsScreen from "./src/screens/AddDropInsScreen";
import { CurrentSessionProvider } from "./src/context/CurrentSessionContext";
import SignatureScreen from "./src/screens/SignatureScreen";
import { useLayoutEffect } from "react";
import SignInScreen from "./src/screens/SignInScreen";
import AuthProvider from "./src/context/AuthContext";
import useAuth from "./src/hooks/useAuth";

interface RootStackParams {
  MainStack: undefined;
  Past: undefined;
  Account: undefined;
  [x: string]: undefined;
}

export type MainStackParams = {
  Home: undefined;
  SelectStudents: undefined;
  AddDropIns: undefined;
  Signature: undefined;
};

export type AuthStackParams = {
  SignIn: undefined;
};

function App() {
  const { user } = useAuth();

  const AuthStack = createNativeStackNavigator<AuthStackParams>();
  const RootStack = createBottomTabNavigator<RootStackParams>();
  const MainStack = createNativeStackNavigator<MainStackParams>();

  const MainScreenStack = ({ navigation, route }: any) => {
    useLayoutEffect(() => {
      const routeName = getFocusedRouteNameFromRoute(route);
      if (routeName === "Signature") {
        navigation.setOptions({ tabBarStyle: { display: "none" } });
      } else {
        navigation.setOptions({ tabBarStyle: { display: "flex" } });
      }
    }, [navigation, route]);

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
        <MainStack.Screen
          name="SelectStudents"
          component={SelectStudentsScreen}
          options={{
            headerTitle: "Select Students",
          }}
        />
        <MainStack.Screen
          name="AddDropIns"
          component={AddDropInsScreen}
          options={{ headerTitle: "Drop Ins" }}
        />
        <MainStack.Screen name="Signature" component={SignatureScreen} />
      </MainStack.Navigator>
    );
  };

  const RootScreenStack = () => {
    return (
      <RootStack.Navigator
        initialRouteName="Main"
        screenOptions={() => ({
          tabBarActiveTintColor: "dodgerblue",
          tabBarInactiveTintColor: "gray",
          // tabBarStyle: { display: visibility(route) },
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
    );
  };

  const AuthScreenStack = () => {
    return (
      <AuthStack.Navigator initialRouteName="SignIn">
        <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {user ? <RootScreenStack /> : <AuthScreenStack />}
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

export default () => {
  return (
    <AuthProvider>
      <CurrentSessionProvider>
        <App />
      </CurrentSessionProvider>
    </AuthProvider>
  );
};
