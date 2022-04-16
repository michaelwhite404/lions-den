import { useContext } from "react";
import { CurrentSessionContext } from "../context/CurrentSessionContext";
export default function useCurrentSession() {
  return useContext(CurrentSessionContext);
}
