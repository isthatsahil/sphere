import * as z from "zod"
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { loginFormSchema } from "@sphere/shared"
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

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

    function onSubmit(data: z.infer<typeof loginFormSchema>) {
        // Do something with the form values.
        console.log(data)
    }

    return (
        <>
            <form id="login-form" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="identifier"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <Input
                                    {...field}
                                    id="identifier"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Email or username"
                                    className="h-13 rounded-xl border-gray-200 text-sm px-4"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                            // <Input placeholder="Email or username" {...field} />
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
            {/* Sign In Button — auto width, NOT full width */}
            <Button type="submit" form="login-form" className="w-auto self-start px-10 h-12 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-base">
                Sign In
            </Button>
            <p className="text-xs text-gray-400">
                Don't have an account?{" "}
                <Button variant="link" className="text-purple-600 text-xs font-semibold hover:underline p-0" onClick={() => setIsLogin((prev) => !prev)}>
                    Sign Up
                </Button>
            </p>
        </>
);
}
