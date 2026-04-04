import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerFormSchema } from "@sphere/shared";
import { useRegister } from "@/hooks/useRegister";
import styles from "./RegisterForm.module.css";

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
    register(data);
  }

  return (
    <div className={styles.root}>
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
                  className={styles.authInput}
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
                  autoComplete="new-password"
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
        type="submit"
        disabled={isPending}
        form="register-form"
        className={styles.submitBtn}
      >
        {isPending ? "Creating account..." : "Create account"}
      </Button>
      <p className={styles.switchText}>
        Already have an account?{" "}
        <Button
          variant="link"
          className={styles.switchLink}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          Sign In
        </Button>
      </p>
    </div>
  );
};

export default RegisterForm;
