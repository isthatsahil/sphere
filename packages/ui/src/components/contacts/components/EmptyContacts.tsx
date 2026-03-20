import { Search } from "lucide-react";

function EmptyContactsDialog() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-14 px-6 gap-2.5">
      <div className="size-11 rounded-2xl bg-muted flex items-center justify-center">
        <Search className="size-4 text-muted-foreground" />
      </div>
      <p className="text-sm font-semibold text-foreground">No matches</p>
      <p className="text-xs text-center leading-relaxed max-w-45 text-muted-foreground">
        Try a different name or username
      </p>
    </div>
  );
}

export default EmptyContactsDialog;
