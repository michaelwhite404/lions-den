import React, { useEffect, useState } from "react";
import Signature from "react-native-signature-canvas";
import * as ScreenOrientation from "expo-screen-orientation";
import { AftercareAttendanceEntry } from "../../types/models/aftercareTypes";
import { signOutStudent } from "../api/cstoneApi";
import useCurrentSession from "../hooks/useCurrentSession";
import showToast from "../utils/showToast";

export default function SignatureScreen({ route, navigation }: any) {
  const { attendance, setAttendance } = useCurrentSession();
  const [locked, setLocked] = useState(false);
  const entry = route.params.entry as AftercareAttendanceEntry;

  async function changeLandscape() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  async function changePortrait() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

  const onSubmit = (signature: string) => {
    if (!locked) {
      setLocked(true);
      signOutStudent(entry!._id, { signature })
        .then((returnedEntry) => {
          const index = attendance.findIndex(
            (singleEntry) => singleEntry.student._id === returnedEntry.student._id
          )!;
          const newAttendance = [...attendance];
          newAttendance[index] = returnedEntry;
          setAttendance(newAttendance);
          showToast("success", `${returnedEntry.student.fullName} sucessfully signed out`);
          navigation.navigate("Home");
        })
        .catch((err) => {
          showToast("error", "Error signing out");
          setLocked(false);
        });
    }
  };

  useEffect(() => {
    changeLandscape();

    return () => {
      changePortrait();
    };
  }, []);

  return (
    <Signature
      descriptionText={`Sign out ${entry?.student.fullName || ""}`}
      confirmText="Sign Out"
      onOK={onSubmit}
      // webStyle={`body,html {height: 100px; width: "100%;}`}
    />
  );
}
