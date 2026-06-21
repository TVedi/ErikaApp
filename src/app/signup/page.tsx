import { PublicLayout } from "@/components/layout/public-layout";
import { SignupForm } from "@/components/auth/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <PublicLayout>
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <SignupForm />
      </div>
    </PublicLayout>
  );
}
