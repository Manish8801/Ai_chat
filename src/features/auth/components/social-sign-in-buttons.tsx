"use client";

import { Button } from "@/components/ui/button";
import { PROVIDERS } from "@/features/auth/lib/types";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import GithubOriginalIcon from "react-devicons/github/original";
import GoogleOriginalIcon from "react-devicons/google/original";

export default function SocialSignInButtons() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInWithSocials = async (provider: PROVIDERS) => {
    setIsLoading(true);
    await authClient.signIn.social({ provider, callbackURL: "/chats" });
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-x-4">
      <Button
        disabled={isLoading}
        type="button"
        onClick={() => signInWithSocials(PROVIDERS.GOOGLE)}
      >
        Sign in with <GoogleOriginalIcon size={20} />
      </Button>
      <span className="text-center">or</span>
      <Button
        disabled={isLoading}
        type="button"
        onClick={() => signInWithSocials(PROVIDERS.GITHUB)}
      >
        Sign in with <GithubOriginalIcon size={20} color="#ffffff" />
      </Button>
    </div>
  );
}
