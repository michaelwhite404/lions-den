import React from "react";
import useCurrentSession from "../hooks/useCurrentSession";
import ActiveSessionScreen from "./Home/ActiveSessionScreen";
import InactiveSessionScreen from "./Home/InactiveSessionScreen";

export default function HomeScreen({ navigation }: any) {
  const currentSession = useCurrentSession();

  return currentSession.session ? (
    <ActiveSessionScreen currentSession={currentSession} navigation={navigation} />
  ) : (
    <InactiveSessionScreen navigation={navigation} />
  );

  // return (
  //   <View style={styles.container}>
  //     <Image style={styles.image} source={require("../../assets/SleepingStudent.png")} />
  //     <Text style={styles.text}>There is no active session</Text>
  //     <View style={tw("absolute bottom-0")}>
  //       <TouchableOpacity onPress={() => navigation.navigate("SelectStudents")}>
  //         <View style={tw("bg-blue-600 w-64 py-3 items-center rounded-md mt-6")}>
  //           <Text style={tw("text-white font-medium")}>Start Session</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
}
