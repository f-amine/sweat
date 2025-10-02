"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      richColors
      position="top-center"
      dir="rtl"
      toastOptions={{ duration: 4000 }}
    />
  );
}
