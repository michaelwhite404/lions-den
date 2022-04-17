import React, { useEffect } from "react";
import Signature from "react-native-signature-canvas";
import * as ScreenOrientation from "expo-screen-orientation";
import { AftercareAttendanceEntry } from "../../types/models/aftercareTypes";

export default function SignatureScreen({ route }: any) {
  const entry = route.params.entry as AftercareAttendanceEntry | undefined;
  async function changeLandscape() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  async function changePortrait() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

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
      onOK={(signature) => console.log(signature)}
    />
  );
}
