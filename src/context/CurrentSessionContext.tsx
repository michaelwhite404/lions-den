import React, { createContext, useEffect, useState, ReactChild } from "react";
import { AftercareAttendanceEntry, AftercareSession } from "../../types/models/aftercareTypes";
import { getSessionToday } from "../api/cstoneApi";

export interface CurrentSession {
  session: AftercareSession | null;
  setSession: React.Dispatch<React.SetStateAction<AftercareSession | null>>;
  attendance: AftercareAttendanceEntry[];
  setAttendance: React.Dispatch<React.SetStateAction<AftercareAttendanceEntry[]>>;
  loaded: boolean;
}

export const CurrentSessionContext = createContext({} as CurrentSession);

export function CurrentSessionProvider({ children }: { children: ReactChild }) {
  const [session, setSession] = useState<AftercareSession | null>(null);
  const [attendance, setAttendance] = useState<AftercareAttendanceEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSessionToday().then((sessionToday) => {
      setSession(sessionToday.session);
      setAttendance(sessionToday.attendance);
      setLoaded(!loaded);
      console.log("DONE");
    });
  }, []);

  return (
    <CurrentSessionContext.Provider
      value={{ session, setSession, attendance, setAttendance, loaded }}
    >
      {children}
    </CurrentSessionContext.Provider>
  );
}
