import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerFormSchema } from "@sphere/shared";
import { useRegister } from "@/hooks/useRegister";

interface RegisterFormProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ setIsLogin }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const { mutate: register, isPending } = useRegister();

  function onSubmit(data: z.infer<typeof registerFormSchema>) {
    console.log(data);
    register(data);
  }

  return (
    <div className="flex flex-col gap-5">
      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Email"
                  className="h-13 rounded-xl text-sm px-4"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="username"
                  autoComplete="username"
                  aria-invalid={fieldState.invalid}
                  placeholder="Username"
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
                  autoComplete="new-password"
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
        type="submit"
        disabled={isPending}
        form="register-form"
        className="w-full h-12 rounded-xl font-semibold text-base"
      >
        {isPending ? "Creating account..." : "Create account"}
      </Button>
      <p className="text-xs text-[oklch(0.50_0.04_322)] dark:text-[oklch(0.58_0.04_322)]">
        Already have an account?{" "}
        <Button
          variant="link"
          className="text-xs font-semibold p-0 h-auto"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          Sign In
        </Button>
      </p>
    </div>
  );
};

export default RegisterForm;
