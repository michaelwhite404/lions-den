import React, { createContext, useState, ReactChild } from "react";
import { AftercareAttendanceEntry, AftercareSession } from "../../types/models/aftercareTypes";

export interface CurrentSession {
  session: AftercareSession | null;
  setSession: React.Dispatch<React.SetStateAction<AftercareSession | null>>;
  attendance: AftercareAttendanceEntry[];
  setAttendance: React.Dispatch<React.SetStateAction<AftercareAttendanceEntry[]>>;
}

export const CurrentSessionContext = createContext({} as CurrentSession);

export function CurrentSessionProvider({ children }: { children: ReactChild }) {
  const [session, setSession] = useState<AftercareSession | null>(null);
  const [attendance, setAttendance] = useState<AftercareAttendanceEntry[]>([]);

  return (
    <CurrentSessionContext.Provider value={{ session, setSession, attendance, setAttendance }}>
      {children}
    </CurrentSessionContext.Provider>
  );
}
