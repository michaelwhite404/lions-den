import React from "react";
import useCurrentSession from "../hooks/useCurrentSession";
import ActiveSessionScreen from "./Home/ActiveSessionScreen";
import InactiveSessionScreen from "./Home/InactiveSessionScreen";

export default function HomeScreen({ navigation }: any) {
  const currentSession = useCurrentSession();

  if (!currentSession.loaded) return null;

  return currentSession.session ? (
    <ActiveSessionScreen currentSession={currentSession} navigation={navigation} />
  ) : (
    <InactiveSessionScreen navigation={navigation} refresh={currentSession.refreshSession} />
  );
}
