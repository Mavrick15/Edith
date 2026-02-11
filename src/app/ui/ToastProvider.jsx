"use client";

import { Toaster } from "react-hot-toast";

const toastOptions = {
  duration: 4500,
  style: {
    borderRadius: "10px",
    padding: "14px 18px",
    fontSize: "15px",
    maxWidth: "420px",
  },
  success: {
    iconTheme: { primary: "#274760", secondary: "#fff" },
  },
  error: {
    iconTheme: { primary: "#dc3545", secondary: "#fff" },
  },
};

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={toastOptions}
      containerStyle={{ top: 24 }}
    />
  );
}
