import { useState } from "react";
import Logo from "../../assets/logo.svg?react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SvgAuthPanel from "./components/SvgPanel";

export default function AuthPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* LEFT — Form panel */}
      <div className="flex flex-col flex-1 px-10 sm:px-14 lg:px-16 py-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5 auth-enter">
          <Logo className="w-9 h-9" />
          <span className="font-display text-sm font-bold tracking-tight text-[oklch(0.22_0.06_322)] dark:text-[oklch(0.88_0.02_322)]">
            Sphere
          </span>
        </div>

        {/* Form area — vertically centered */}
        <div className="flex-1 flex flex-col justify-center max-w-95">
          {/* Heading — key swap triggers re-animation */}
          <div key={isLoginForm ? "lh" : "rh"} className="mb-8 auth-enter">
            <h1 className="auth-heading font-display font-black leading-[1.02] tracking-tight mb-3 text-[oklch(0.18_0.05_322)] dark:text-[oklch(0.95_0.01_320)]">
              {isLoginForm ? "Welcome back." : "Join Sphere."}
            </h1>
            <p className="text-sm leading-relaxed text-[oklch(0.50_0.05_322)] dark:text-[oklch(0.58_0.04_322)]">
              {isLoginForm
                ? "Your conversations are waiting."
                : "Start something personal."}
            </p>
          </div>

          {/* Form — key swap triggers re-animation */}
          <div key={isLoginForm ? "lf" : "rf"} className="auth-enter-delay-1">
            {isLoginForm ? (
              <LoginForm setIsLogin={setIsLoginForm} />
            ) : (
              <RegisterForm setIsLogin={setIsLoginForm} />
            )}
          </div>
        </div>

        {/* Brand accent */}
        <div className="auth-enter-delay-2 h-px w-12 bg-[oklch(0.62_0.22_322)]" />
      </div>

      {/* RIGHT — Illustration panel */}
      <SvgAuthPanel />
    </div>
  );
}
