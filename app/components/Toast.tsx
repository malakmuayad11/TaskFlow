type ToastProps = {
  title: string;
  additionalStyle?: string;
};

export default function Toast({ title, additionalStyle = "" }: ToastProps) {
  return (
    <div
      className={`
        fixed right-5 bottom-5
        flex items-center gap-3
        max-w-sm
        rounded-xl
        border
        backdrop-blur-md
        px-4 py-3
        shadow-lg
        text-sm
        animate-in fade-in slide-in-from-bottom-4
        ${additionalStyle}
      `}
    >
      <div
        className="
          flex h-6 w-6
          shrink-0
          items-center justify-center
          rounded-full
          bg-current/20
        "
      >
        !
      </div>

      <p>{title}</p>
    </div>
  );
}
