import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, ReactChild, useEffect, useLayoutEffect } from "react";
import Credentials from "../../types/credentials";
import { User } from "../../types/models/userModel";
import * as cstoneApi from "../api/cstoneApi";

interface Auth {
  user: User | null;
  signIn: (credentials: Credentials) => void;
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
      .catch()
      .finally(() => setLoaded(true));

  const signIn = (credentials: Credentials) => {
    cstoneApi
      .signIn(credentials)
      .then(async ({ user, token }) => {
        await AsyncStorage.setItem("token", token);
        setUser(user);
      })
      .catch((err) => console.error(err.response.data));
  };

  if (!loaded) {
    return null;
  }

  return <AuthContext.Provider value={{ user, signIn }}>{children}</AuthContext.Provider>;
}
