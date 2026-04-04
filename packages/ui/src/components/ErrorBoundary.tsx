import { Component, type ErrorInfo, type ReactNode } from "react";

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
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-8 text-center">
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
          <p className="auth-enter-delay-1 font-display text-xl font-bold text-foreground">
            Something got tangled.
          </p>

          {/* Body */}
          <p className="auth-enter-delay-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            This part of Sphere ran into an unexpected issue.
            <br />
            Try again and it should be fine.
          </p>

          {/* Reset button */}
          <button
            onClick={this.reset}
            className="btn-auth auth-enter-delay-2 mt-1 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            Try again
          </button>

          {/* Collapsible technical details — for curious/dev users */}
          {this.state.error && (
            <details className="auth-enter-delay-2 mt-2 max-w-sm text-left">
              <summary className="cursor-pointer select-none text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground">
                Show details
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted p-3 text-xs text-muted-foreground">
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
