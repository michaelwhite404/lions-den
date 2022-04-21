import React from "react";
import useCurrentSession from "../hooks/useCurrentSession";
import ActiveSessionScreen from "./Home/ActiveSessionScreen";
import InactiveSessionScreen from "./Home/InactiveSessionScreen";

export default function HomeScreen({ navigation }: any) {
  const currentSession = useCurrentSession();

  if (!currentSession.loaded) return null;

  const SessionScreen = currentSession.session ? ActiveSessionScreen : InactiveSessionScreen;

  return <SessionScreen navigation={navigation} currentSession={currentSession} />;
}
