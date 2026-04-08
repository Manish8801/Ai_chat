"use client";

import { Button } from "@/components/ui/button";
import { PROVIDER } from "@/features/auth/lib/types";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import GithubOriginalIcon from "react-devicons/github/original";
import GoogleOriginalIcon from "react-devicons/google/original";

type Props = {
  tabIndex? : number;
}
export default function SocialSignInButtons({tabIndex = 1} : Props) {
  const [providerState, setProviderState] = useState<{
    provider: PROVIDER | null;
    isLoading: boolean;
  }>({
    provider: null,
    isLoading: false,
  });

  const signInWithSocials = async (provider: PROVIDER) => {
    setProviderState({ provider, isLoading: true });
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/chats",
        disableRedirect: true,
        errorCallbackURL: "/auth/sign-in",
      });
    } catch (err) {
      console.log("Error while signing in using social ");
    } finally {
      setProviderState({ provider: null, isLoading: false });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-between gap-4">
      <Button
        tabIndex={tabIndex + 1}
        disabled={providerState.isLoading}
        className="cursor-pointer flex-1 "
        onClick={() => signInWithSocials(PROVIDER.GOOGLE)}
        >
        {providerState.provider === PROVIDER.GOOGLE ? "Signing in..." : "Google"}
        <GoogleOriginalIcon size={20} />
      </Button>
      <span className="hidden sm:inline text-center">or</span>
      <Button
      tabIndex={tabIndex + 2}
        className="cursor-pointer flex-1"
        disabled={providerState.isLoading}
        type="button"
        onClick={() => signInWithSocials(PROVIDER.GITHUB)}
      >
        {providerState.provider === PROVIDER.GITHUB ? "Signing in..." : "Github"}
        <GithubOriginalIcon size={20} color="#ffffff" />
      </Button>
    </div>
  );
}
