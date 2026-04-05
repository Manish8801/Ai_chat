"use client";

import { Button } from "@/components/ui/button";
import { PROVIDERS } from "@/features/auth/lib/types";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import GithubOriginalIcon from "react-devicons/github/original";
import GoogleOriginalIcon from "react-devicons/google/original";

export default function SocialSignInButtons() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInWithSocials = (provider: PROVIDERS) => {
    setIsLoading(true);
    authClient.signIn.social({
      provider,
      callbackURL: "/chats",
      disableRedirect: true,
      errorCallbackURL: "/auth/sign-in",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-between gap-4">
      <Button
        disabled={isLoading}
        className="cursor-pointer " 
        onClick={() => signInWithSocials(PROVIDERS.GOOGLE)}
      >
        
        Sign in with <GoogleOriginalIcon size={20} />
      </Button>
      <span className="hidden sm:inline text-center">or</span>
      <Button
        className="cursor-pointer"
        disabled={isLoading}
        type="button"
        onClick={() => signInWithSocials(PROVIDERS.GITHUB)}
      >
        
        Sign in with
        <GithubOriginalIcon size={20} color="#ffffff" />
      </Button>
    </div>
  );
}
