import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginFormSchema } from "@sphere/shared";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ setIsLogin }: LoginFormProps) {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const { mutate: login, isPending } = useLogin();
  function onSubmit(data: z.infer<typeof loginFormSchema>) {
    login(data);
  }

  return (
    <div className={styles.root}>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="identifier"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="identifier"
                  autoComplete="username"
                  aria-invalid={fieldState.invalid}
                  placeholder="Email or username"
                  className={styles.authInput}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Password"
                  className={styles.authInput}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Button
        disabled={isPending}
        type="submit"
        form="login-form"
        className={styles.submitBtn}
      >
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
      <p className={styles.switchText}>
        Don't have an account?{" "}
        <Button
          variant="link"
          className={styles.switchLink}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
}
