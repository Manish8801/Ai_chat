"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import SocialSignInButtons from "@/features/auth/components/social-sign-in-buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { signUpWithEmail } from "../actions/auth.action";
import { SignUpFormInput } from "../lib/types";
import { signUpFormSchema } from "../lib/validator";
import { PasswordInput } from "./password-input";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  rememberMe: false,
};
export default function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const handleSubmit = async (body: SignUpFormInput) => {
    await signUpWithEmail(body);
  };

  return (
    <Card className="border-none">
      <CardContent className="flex flex-col gap-4 p-0 ">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <FieldGroup className="flex flex-col gap-4">
            <input type="text" name="username" readOnly hidden/>
            <Controller
              name="name"
              control={form.control}
              render={({ fieldState, field }) => (
                <Field className="gap-2">
                  <FieldLabel className="pl-2" htmlFor={field.name}>
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    name="name"
                    id={field.name}
                    placeholder="Full Name"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ fieldState, field }) => (
                <Field className="gap-2">
                  <FieldLabel className="pl-2" htmlFor={field.name}>
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    name="email"
                    id={field.name}
                    placeholder="Email Address"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="relative flex gap-2">
              <Controller
                name="password"
                control={form.control}
                render={({ fieldState, field }) => (
                  <Field className="gap-2">
                    <FieldLabel className="pl-2" htmlFor={field.name}>
                      Password
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      name="password"
                      id={field.name}
                      placeholder="Password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ fieldState, field }) => (
                  <Field className="gap-2">
                    <FieldLabel className="pl-2" htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      name="confirmPassword"
                      id={field.name}
                      placeholder="Confirm Password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="rememberMe"
              control={form.control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    {...field}
                    value="remember-me"
                    id={field.name}
                    name="remember-me"
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor={field.name}>Remember me</FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
          <Button
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            type="submit"
          >
            {form.formState.isSubmitting ? "Signing you up..." : "Sign up"}
          </Button>{" "}
        </form>
        <Separator />
        <SocialSignInButtons />
      </CardContent>
      <CardFooter className="">
        <p className="mx-auto text-center text-sm">
          Already have an account?{" "}
          <Link className="underline underline-offset-2" href={"/log-in"}>
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
