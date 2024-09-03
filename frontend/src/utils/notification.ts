import { Bounce, toast, ToastOptions } from "react-toastify";

export const notify = (type: "success" | "error" | "info" | "warning", text: string) => {
  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  };

  switch (type) {
    case "success":
      toast.success(text, toastOptions);
      break;
    case "error":
      toast.error(text, toastOptions);
      break;
    case "info":
      toast.info(text, toastOptions);
      break;
    case "warning":
      toast.warn(text, toastOptions);
      break;
    default:
      console.error("Invalid toast type");
  }
};
