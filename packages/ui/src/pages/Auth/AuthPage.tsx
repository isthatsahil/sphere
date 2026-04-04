import { useState } from "react";
import Logo from "../../assets/logo.svg?react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SvgAuthPanel from "./components/SvgPanel";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className={styles.root}>
      {/* LEFT — Form panel */}
      <div className={styles.formPanel}>
        {/* Logo */}
        <div className={`${styles.logo} auth-enter`}>
          <Logo className={styles.logoIcon} />
          <span className={styles.logoText}>Sphere</span>
        </div>

        {/* Form area — vertically centered */}
        <div className={styles.formArea}>
          {/* Heading — key swap triggers re-animation */}
          <div key={isLoginForm ? "lh" : "rh"} className={`${styles.headingBlock} auth-enter`}>
            <h1 className={styles.heading}>
              {isLoginForm ? "Welcome back." : "Join Sphere."}
            </h1>
            <p className={styles.subtitle}>
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
        <div className={`${styles.accent} auth-enter-delay-2`} />
      </div>

      {/* RIGHT — Illustration panel */}
      <SvgAuthPanel />
    </div>
  );
}
