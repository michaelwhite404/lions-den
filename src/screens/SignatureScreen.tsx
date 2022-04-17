import React, { useEffect } from "react";
import Signature from "react-native-signature-canvas";
import * as ScreenOrientation from "expo-screen-orientation";
import { AftercareAttendanceEntry } from "../../types/models/aftercareTypes";
import { signOutStudent } from "../api/cstoneApi";
import LZString from "lz-string";
import { CurrentSession } from "../context/CurrentSessionContext";
import useCurrentSession from "../hooks/useCurrentSession";

export default function SignatureScreen({ route, navigation }: any) {
  const { attendance, setAttendance } = useCurrentSession();
  const entry = route.params.entry as AftercareAttendanceEntry;

  async function changeLandscape() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  async function changePortrait() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

  const onSubmit = (signature: string) => {
    // console.log(signature.length);
    // const compressed = LZString.compress(signature);
    // console.log("-----------");
    // console.log(compressed.length);
    signOutStudent(entry!._id, { signature })
      .then((returnedEntry) => {
        const index = attendance.findIndex(
          (singleEntry) => singleEntry.student._id === returnedEntry.student._id
        )!;
        const newAttendance = [...attendance];
        newAttendance[index] = returnedEntry;
        setAttendance(newAttendance);
        console.log("submitted");
        navigation.navigate("Home");
      })
      .catch(console.error);
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
