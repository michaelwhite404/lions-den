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
  const [session, setSession] = useState<AftercareSession | null>({
    active: true,
    _id: "625b5796381fd5098a225076",
    date: new Date("2022-04-16T23:56:06.171Z"),
    numAttended: 5,
    dropIns: 2,
  });
  const [attendance, setAttendance] = useState<AftercareAttendanceEntry[]>([
    {
      _id: "625b5796381fd5098a225078",
      student: {
        _id: "5f43ba6edca18d644cbf6c8e",
        fullName: "Trenton Blackman",
        schoolEmail: "trenton.blackman@cornerstone-schools.org",
      },
      session: "625b5796381fd5098a225076",
      dropIn: false,
    },
    {
      _id: "625b5796381fd5098a22507a",
      student: {
        _id: "5f43ba6edca18d644cbf6c9e",
        fullName: "Ciara Davis",
        schoolEmail: "ciara.davis@cornerstone-schools.org",
      },
      session: "625b5796381fd5098a225076",
      dropIn: false,
    },
    {
      _id: "625b5796381fd5098a225079",
      student: {
        _id: "5f43ba6edca18d644cbf6c9d",
        fullName: "Khamari Becton",
        schoolEmail: "khamari.becton@cornerstone-schools.org",
      },
      session: "625b5796381fd5098a225076",
      dropIn: false,
    },
    {
      _id: "625b5796381fd5098a22507b",
      student: {
        _id: "5f43ba6edca18d644cbf6cc4",
        fullName: "Omar Payne, Jr.",
        schoolEmail: "omar.payne@cornerstone-schools.org",
      },
      session: "625b5796381fd5098a225076",
      dropIn: true,
    },
    {
      _id: "625b5796381fd5098a22507c",
      student: {
        _id: "5f43ba6edca18d644cbf6cf2",
        fullName: "Omarian Payne",
        schoolEmail: "omarian.payne@cornerstone-schools.org",
      },
      session: "625b5796381fd5098a225076",
      dropIn: true,
    },
  ]);

  return (
    <CurrentSessionContext.Provider value={{ session, setSession, attendance, setAttendance }}>
      {children}
    </CurrentSessionContext.Provider>
  );
}
