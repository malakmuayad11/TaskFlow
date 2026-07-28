import type { ReactNode } from "react";

type InputWrapperProps = {
  className?: string;
  children: ReactNode;
};

export default function InputWrapper({
  className,
  children,
}: InputWrapperProps) {
  return (
    <div className={`flex flex-col gap-0.5 ${className ?? ""}`}>{children}</div>
  );
}
