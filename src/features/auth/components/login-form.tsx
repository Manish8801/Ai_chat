"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { logInWithEmail } from "@/features/auth/actions/auth.action";
import { PasswordInput } from "@/features/auth/components/password-input";
import { LogInFormInput } from "@/features/auth/lib/types";
import { logInFormSchema } from "@/features/auth/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import SocialSignInButtons from "./social-sign-in-buttons";

const DEFAULT_VALUE = {
  email: "",
  password: "",
};
export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(logInFormSchema),
    defaultValues: DEFAULT_VALUE,
  });
  const handleSubmit = async (body: LogInFormInput) => {
    await logInWithEmail(body);
  };
  return (
    <Card className="border-none">
      <CardContent className="flex flex-col gap-4 p-0">
        <SocialSignInButtons />
        <Separator />
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <input type="text" name="username" readOnly hidden />
          <FieldGroup className="flex flex-col gap-4">
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <Field className="gap-2">
                  <FieldLabel className="pl-2" htmlFor={field.name}>
                    Email
                  </FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    name="email"
                    autoComplete="email"
                    placeholder="Email address"
                  />
                  <FieldError />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <Field className="gap-2">
                  <FieldLabel className="pl-2" htmlFor={field.name}>
                    Password
                  </FieldLabel>
                  <PasswordInput
                    id={field.name}
                    {...field}
                    name="password"
                    placeholder="Password"
                  />
                  <FieldError />
                </Field>
              )}
            />
          </FieldGroup>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            type="submit"
            className="w-full cursor-pointer"
          >
            {form.formState.isSubmitting ? "Logging you in..." : "Log in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="">
        <p className="text-center text-sm mx-auto">
          Don&apos;t have an account?{" "}
          <Link className="underline underline-offset-2" href={"/sign-up"}>
            Create one
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
