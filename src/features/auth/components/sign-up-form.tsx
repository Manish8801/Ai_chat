"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import GithubOriginal from "react-devicons/github/original";
import GoogleOriginal from "react-devicons/google/original";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInWithSocials = async (provider: "google" | "github") => {
    setIsLoading(true);
    await authClient.signIn.social({ provider, callbackURL: "/" });
  };
  return (
    <>
      <div className="mt-6 flex flex-col gap-y-2">
        <Button
          disabled={isLoading}
          type="button"
          onClick={() => signInWithSocials("google")}
        >
          <GoogleOriginal />
          Sign in with Google
        </Button>
        <Button
          disabled={isLoading}
          type="button"
          onClick={() => signInWithSocials("github")}
        >
          <GithubOriginal color="#ffffff" />
          Sign in with Github
        </Button>
      </div>
    </>
  );
}
