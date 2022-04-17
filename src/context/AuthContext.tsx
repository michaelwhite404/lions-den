import React, { createContext, useState, ReactChild } from "react";
import { User } from "../../types/models/userModel";

interface Auth {
  user: User;
}

const AuthContext = createContext({});

export default function AuthProvider({ children }: { children: ReactChild }) {
  const [user, setUser] = useState<User | null>(null);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
