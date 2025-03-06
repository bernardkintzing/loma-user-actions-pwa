import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

// create callable function from string path
export const callable = <RequestData = unknown, ResponseData = unknown>(path: string) => httpsCallable<RequestData, ResponseData>(functions, path);
