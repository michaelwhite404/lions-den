import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import AccountRow from "../components/AccountRow";

export default function AccountScreen() {
  const { user, signOut } = useAuth();

  const signOutUser = () => setTimeout(() => signOut(), 500);

  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profile}>
        {/* Image */}
        <Image style={styles.image} source={{ uri: user?.image }} />
        {/* Text */}
        <View>
          <Text style={styles.name}>{user?.fullName}</Text>
          <Text style={styles.title}>{user?.title}</Text>
        </View>
      </View>
      <View style={{ borderTopColor: "#e5e7eb", borderTopWidth: 1 }}>
        <AccountRow
          text="Log out"
          icon={<Ionicons name="log-out-outline" size={24} color="red" />}
          color="red"
          onPress={signOutUser}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginVertical: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 500,
    marginRight: 15,
  },
  name: {
    fontWeight: "600",
  },
  title: {
    color: "#757575",
  },
});
