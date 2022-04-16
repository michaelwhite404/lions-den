import React, { createContext, useState, ReactChild } from "react";
import { AftercareAttendanceEntryModel } from "../../types/models/aftercareTypes";

interface CurrentSession {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  attendance: AftercareAttendanceEntryModel[];
  setAttendance: React.Dispatch<React.SetStateAction<AftercareAttendanceEntryModel[]>>;
}

export const CurrentSessionContext = createContext({} as CurrentSession);

export function CurrentSessionProvider({ children }: { children: ReactChild }) {
  const [active, setActive] = useState(false);
  const [attendance, setAttendance] = useState<AftercareAttendanceEntryModel[]>([]);

  return (
    <CurrentSessionContext.Provider value={{ active, setActive, attendance, setAttendance }}>
      {children}
    </CurrentSessionContext.Provider>
  );
}
