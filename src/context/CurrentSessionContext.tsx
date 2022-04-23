import React, { createContext, useEffect, useState, ReactChild, useCallback } from "react";
import { AftercareAttendanceEntry, AftercareSession } from "../../types/models/aftercareTypes";
import { getSessionToday } from "../api/cstoneApi";

export interface CurrentSession {
  session: AftercareSession | null;
  setSession: React.Dispatch<React.SetStateAction<AftercareSession | null>>;
  attendance: AftercareAttendanceEntry[];
  setAttendance: React.Dispatch<React.SetStateAction<AftercareAttendanceEntry[]>>;
  loaded: boolean;
  refreshSession: () => void;
}

export const CurrentSessionContext = createContext({} as CurrentSession);

export function CurrentSessionProvider({ children }: { children: ReactChild }) {
  const [session, setSession] = useState<AftercareSession | null>(null);
  const [attendance, setAttendance] = useState<AftercareAttendanceEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    refreshSession();
  }, []);

  const refreshSession = useCallback(() => {
    getSessionToday().then((sessionToday) => {
      setSession(sessionToday.session);
      setAttendance(sessionToday.attendance);
      setLoaded(!loaded);
    });
  }, []);

  return (
    <CurrentSessionContext.Provider
      value={{ session, setSession, attendance, setAttendance, loaded, refreshSession }}
    >
      {children}
    </CurrentSessionContext.Provider>
  );
}
