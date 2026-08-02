type toastProps = {
  title: string;
  additionalStyle?: string;
};

export default function Toast({ title, additionalStyle }: toastProps) {
  return (
    <div
      className="
    fixed right-5 bottom-5
    flex items-center gap-3
    max-w-sm
    rounded-xl
    border
    border-green-500/30
    bg-green-500/10
    backdrop-blur-md
    px-4 py-3
    shadow-lg
    text-sm
    text-green-600
    dark:text-green-400
    animate-in fade-in slide-in-from-bottom-4
  "
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
        ✓
      </div>

      <p>Account is created successfully.</p>
    </div>
  );
}
