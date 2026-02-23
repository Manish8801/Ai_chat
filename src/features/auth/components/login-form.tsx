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
    <div className="flex-1">
      <Card className="p-4">
        <CardContent className="flex flex-col gap-4 p-0 ">
          <SocialSignInButtons />
          <Separator />
          <form id="login-form" onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input id={field.name} {...field} />
                    <FieldError />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="password"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <PasswordInput id={field.name} {...field} />
                    <FieldError />
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end p-0 m-0">
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            type="submit"
            form="login-form"
          >
            {form.formState.isSubmitting ? "Logging you in..." : "Log in"}
          </Button>
        </CardFooter>
      </Card>
      <p className="text-center text-sm mt-2">
        Don&apos;t have an account?{" "}
        <Link className="underline underline-offset-2" href={"/sign-up"}>
          Create one
        </Link>
      </p>
    </div>
  );
}
