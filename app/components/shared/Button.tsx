import type { FormEvent } from "react";

type ButtonProps = {
  content: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button" | "reset";
};

export default function Button({
  content,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={`bg-primary hover:bg-primary-hover text-primary-light rounded-btn py-3 px-6 hover:cursor-pointer w-full text-xl hover:-translate-y-1 transition-transform duration-300 ${className ?? ""}`}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  );
}
