import Logo from "@/assets/logo.svg?react";

const EmptyChatPageBody = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Ambient blobs — purely decorative, reduced motion respected */}
      <div className="chat-empty-blob-primary" aria-hidden="true" />
      <div className="chat-empty-blob-secondary" aria-hidden="true" />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-5 px-8 text-center">
        {/* Logo halo */}
        <div className="auth-logo-halo">
          <Logo className="w-12 h-12 relative z-10" />
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-1.5">
          <h2 className="font-display font-black text-2xl tracking-tight leading-none text-[oklch(0.22_0.06_322)] dark:text-[oklch(0.88_0.02_322)]">
            Your space.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-55">
            Open the menu to pick up where you left off, or start something new.
          </p>
        </div>

        {/* Hint arrow pointing to menu */}
        <div className="flex items-center gap-2 text-muted-foreground mt-1">
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M19 6H1M1 6L6 1M1 6L6 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[0.7rem] font-medium tracking-wide">
            conversations
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatPageBody;
