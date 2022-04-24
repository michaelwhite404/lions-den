import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, ReactChild, useEffect, useLayoutEffect } from "react";
import Credentials from "../../types/credentials";
import { User } from "../../types/models/userModel";
import * as cstoneApi from "../api/cstoneApi";

interface Auth {
  user: User | null;
  signIn: (credentials: Credentials) => Promise<{
    token: string;
    user: User;
  }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as Auth);

export default function AuthProvider({ children }: { children: ReactChild }) {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    tryLocalSignIn();
  }, []);

  const tryLocalSignIn = () =>
    cstoneApi
      .getMe()
      .then((user) => setUser(user))
      .catch(() => {})
      .finally(() => setLoaded(true));

  const signIn = async (credentials: Credentials) => {
    const { token, user } = await cstoneApi.signIn(credentials);
    await AsyncStorage.setItem("token", token);
    setUser(user);
    return { token, user };
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  if (!loaded) {
    return null;
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}
