"use client";

import { Button } from "@/components/ui/button";
import { PROVIDERS } from "@/features/auth/lib/types";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useState } from "react";
import GithubOriginalIcon from "react-devicons/github/original";
import GoogleOriginalIcon from "react-devicons/google/original";

export default function SocialSignInButtons() {
  const [selecteProvider, setSelectedProvider] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInWithSocials = (provider: PROVIDERS) => {
    setIsLoading(true);
    setSelectedProvider(provider);
    authClient.signIn.social({
      provider,
      callbackURL: "/chats",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-between gap-4">
      <Button
        disabled={isLoading}
        className="cursor-pointer flex-1"
        onClick={() => signInWithSocials(PROVIDERS.GOOGLE)}
      >
        {selecteProvider === PROVIDERS.GOOGLE && (
          <Loader className="animate-spin" />
        )}
        Sign in with <GoogleOriginalIcon size={20} />
      </Button>
      <span className="hidden sm:inline text-center">or</span>
      <Button
        className="cursor-pointer flex-1 "
        disabled={isLoading}
        type="button"
        onClick={() => signInWithSocials(PROVIDERS.GITHUB)}
      >
        {selecteProvider === PROVIDERS.GITHUB && (
          <Loader className="animate-spin" />
        )}
        Sign in with
        <GithubOriginalIcon size={20} color="#ffffff" />
      </Button>
    </div>
  );
}
