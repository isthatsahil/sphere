import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { registerFormSchema } from "@sphere/shared";

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

  function onSubmit(data: z.infer<typeof registerFormSchema>) {
      // Do something with the form values.
      console.log(data)
  }
  return (
    <>
    <form id="register-form" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                          aria-invalid={fieldState.invalid}
                          placeholder="Email"
                          className="h-13 rounded-xl border-gray-200 text-sm px-4"
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
                          aria-invalid={fieldState.invalid}
                          placeholder="Username"
                          className="h-13 rounded-xl border-gray-200 text-sm px-4"
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
                          aria-invalid={fieldState.invalid}
                          placeholder="Password"
                          className="h-13 rounded-xl border-gray-200 text-sm px-4"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
            />
        </FieldGroup>
    </form>
    <Button type="submit" form="register-form" className="w-auto self-start px-10 h-12 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-base">
      Sign Up
    </Button>
    <p className="text-xs text-gray-400">
      Already have an account?{" "}
      <Button variant="link" className="text-purple-600 text-xs font-semibold hover:underline p-0" onClick={() => setIsLogin((prev) => !prev)}>
          Sign In
      </Button>
    </p>
    </>
  )
}

export default RegisterForm