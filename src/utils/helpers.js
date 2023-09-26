import toast from "react-hot-toast";
import { TEXTS } from "./constants";

export const getErrorNotification = (err) => {
  const response = err?.response?.data?.message || TEXTS.SOMETHING_WENT_WRONG;
  toast.error(response);
};
