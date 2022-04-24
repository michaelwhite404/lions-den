import Toast from "react-native-toast-message";

type ToastType = "success" | "info" | "error";

export default (type: ToastType, text1: string, text2?: string) => {
  Toast.show({
    type,
    text1,
    text2,
    topOffset: 50,
  });
};
