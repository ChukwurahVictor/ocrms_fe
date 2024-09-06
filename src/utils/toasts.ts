import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const SuccessToast = (message: string) => {
  toast.success(message, {
    // duration: 4000, 
    position: 'top-right',
      // icon: ✅,
      style: {
        border: '1px solid #4CAF50',
        padding: '16px',
        color: '#4CAF50',
        fontSize: '16px',
        backgroundColor: '#E8F5E9',
    },
  })
};

export const ErrorToast = (message: string) => {
  toast.error(message,  {
    // duration: 4000, 
    position: 'top-right',
      // icon: ✅,
      style: {
        border: '1px solid red',
        padding: '16px',
        color: 'red',
        fontSize: '16px',
        backgroundColor: '#E8F5E9',
    },
  });
};

export const InfoToast = (message: string) => {
  toast.info(message);
};

export const WarningToast = (message: string) => {
  toast.warning(message);
};
