import type { InputHTMLAttributes } from "react";

export default function Input({
  inputType,
  isRequired = true,
}: {
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  isRequired: boolean;
}) {
  if (isRequired)
    return (
      <input
        required
        type={inputType}
        className="border-[1.75px] border-border-color rounded-btn bg-primary-light p-1 focus:outline-primary"
      ></input>
    );

  return (
    <input
      type={inputType}
      className="border-[1.75px] border-border-color rounded-btn bg-primary-light p-1 focus:outline-primary"
    ></input>
  );
}
