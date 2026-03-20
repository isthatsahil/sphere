import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginFormSchema } from "@sphere/shared";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";

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
    <div className="flex flex-col gap-5">
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
                  className="h-13 rounded-xl text-sm px-4"
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
                  className="h-13 rounded-xl text-sm px-4"
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
        className="w-full h-12 rounded-xl font-semibold text-base"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
      <p className="text-xs text-[oklch(0.50_0.04_322)] dark:text-[oklch(0.58_0.04_322)]">
        Don't have an account?{" "}
        <Button
          variant="link"
          className="text-xs font-semibold p-0 h-auto"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
}
