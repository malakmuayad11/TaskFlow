import type { ReactNode } from "react";

export default function RequiredComponent({
  children,
  isMissing,
}: {
  children: ReactNode;
  isMissing: boolean;
}) {
  return (
    <div className={isMissing ? "visible border-2 border-red-500" : "hidden"}>
      <p className={isMissing ? "hidden" : "text-red-500 visible"}>
        This field is required
      </p>
      {children}
    </div>
  );
}
