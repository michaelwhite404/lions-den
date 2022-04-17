import React, { useEffect } from "react";
import Signature from "react-native-signature-canvas";
import * as ScreenOrientation from "expo-screen-orientation";

export default function SignatureScreen() {
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  useEffect(() => {
    changeScreenOrientation();
  }, []);

  return (
    <Signature
      descriptionText="Sign out for student"
      confirmText="Sign Out"
      onOK={(signature) => console.log(signature)}
    />
  );
}
