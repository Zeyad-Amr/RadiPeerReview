"use client";

import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import Test from "@/core/shared/components/test";
import LoginPage from "@/modules/auth/view/pages/LoginPage";

// ----------------------------------------------------------------------

export default function App() {
  return (
    // <ProtectedLayout>
      <LoginPage/>
    // </ProtectedLayout>
  );
}
