import React, { useEffect } from "react";
import Signature from "react-native-signature-canvas";
import * as ScreenOrientation from "expo-screen-orientation";
import { AftercareAttendanceEntry } from "../../types/models/aftercareTypes";
import { signOutStudent } from "../api/cstoneApi";
import LZString from "lz-string";

export default function SignatureScreen({ route }: any) {
  const entry = route.params.entry as AftercareAttendanceEntry | undefined;
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
      .then((entry) => console.log("submitted"))
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
