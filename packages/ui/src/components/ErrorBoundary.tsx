import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className={styles.root}>
          {/* Illustration — two message bubbles that drifted apart */}
          <div className="logo-float mb-2">
            <svg
              className="auth-enter h-28 w-28"
              viewBox="0 0 140 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Left bubble — outgoing, brand primary */}
              <rect
                x="2" y="30" width="52" height="34" rx="12"
                fill="oklch(0.518 0.253 323.949)"
                fillOpacity="0.9"
              />
              <path
                d="M 32 64 Q 28 74 16 74 Q 28 67 36 64 Z"
                fill="oklch(0.518 0.253 323.949)"
                fillOpacity="0.9"
              />
              <rect x="11" y="40" width="34" height="3" rx="1.5" fill="white" fillOpacity="0.75" />
              <rect x="11" y="48" width="22" height="3" rx="1.5" fill="white" fillOpacity="0.5" />

              {/* Right bubble — incoming, drifted away */}
              <rect
                x="86" y="16" width="52" height="34" rx="12"
                fill="oklch(0.452 0.211 324.591)"
                fillOpacity="0.7"
              />
              <path
                d="M 108 50 Q 112 60 124 60 Q 112 53 104 50 Z"
                fill="oklch(0.452 0.211 324.591)"
                fillOpacity="0.7"
              />
              <rect x="95" y="26" width="34" height="3" rx="1.5" fill="white" fillOpacity="0.65" />
              <rect x="95" y="34" width="20" height="3" rx="1.5" fill="white" fillOpacity="0.45" />

              {/* Broken connection — three fading dots in the gap */}
              <circle cx="63" cy="50" r="2.5" fill="oklch(0.833 0.145 321.434)" fillOpacity="0.55" />
              <circle cx="73" cy="46" r="2"   fill="oklch(0.833 0.145 321.434)" fillOpacity="0.35" />
              <circle cx="81" cy="42" r="1.5" fill="oklch(0.833 0.145 321.434)" fillOpacity="0.2" />
            </svg>
          </div>

          {/* Heading */}
          <p className={`${styles.heading} auth-enter-delay-1`}>
            Something got tangled.
          </p>

          {/* Body */}
          <p className={`${styles.body} auth-enter-delay-2`}>
            This part of Sphere ran into an unexpected issue.
            <br />
            Try again and it should be fine.
          </p>

          {/* Reset button */}
          <button
            onClick={this.reset}
            className={`${styles.resetBtn} auth-enter-delay-2`}
          >
            Try again
          </button>

          {/* Collapsible technical details — for curious/dev users */}
          {this.state.error && (
            <details className={`${styles.details} auth-enter-delay-2`}>
              <summary className={styles.detailsSummary}>
                Show details
              </summary>
              <pre className={styles.detailsPre}>
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
