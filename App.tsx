import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AccountScreen, HomeScreen, PastScreen } from "./src/screens";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

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
              <FontAwesome5 name="backward" size={size} color={color} />
            ),
          }}
        />
        <RootStack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerTitle: "Account",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" size={size} color={color} />
            ),
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Lions Den App</Text>

    // </View>
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
