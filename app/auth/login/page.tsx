import { Suspense } from "react";
import LoginPage from "./_components/login-page";

export default function Page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}