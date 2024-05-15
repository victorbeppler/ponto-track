import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

// Define um novo tipo para os estados do Toast
type ToastType = "error" | "warning" | "info" | "success";

interface ToastState {
  showToast: boolean;
  type: ToastType | ""; // Pode ser um dos quatro tipos válidos ou uma string vazia
  description: string;
}

interface ToastContextType {
  showToast: (
    type: ToastType,
    description: string,
    navigatePath?: string
  ) => void;
}

type ToastProviderProps = {
  children: React.ReactNode;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = (props: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastState>({
    showToast: false,
    type: "",
    description: "",
  });
  const navigate = useNavigate();

  const showToast = (
    type: ToastType,
    description: string,
    navigatePath?: string
  ) => {
    setToast({ showToast: true, type, description });
    setTimeout(() => {
      setToast({ showToast: false, type: "", description: "" });
      if (navigatePath) navigate(navigatePath);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {props.children}
      {toast.showToast && (
        <Toast type={toast.type as ToastType} description={toast.description} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
