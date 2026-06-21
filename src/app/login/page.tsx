import { PublicLayout } from "@/components/layout/public-layout";
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <PublicLayout>
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <LoginForm />
      </div>
    </PublicLayout>
  );
}
