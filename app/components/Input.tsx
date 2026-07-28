import { useState, type InputHTMLAttributes, type Ref } from "react";
import InputWrapper from "./InputWrapper";

type InputProps = {
  inputType: InputHTMLAttributes<HTMLInputElement>["type"];
  isRequired?: boolean;
  isHidden?: boolean;
  validationRegex?: RegExp;
  validationMsg?: string;
  onValidate?: () => boolean;
  onValidationChange?: (isValid: boolean) => void;
  labelName: string;
  ref: Ref<HTMLInputElement>;
  accept?: string;
  className?: string;
  wrapperClassName?: string;
};

export default function Input({
  inputType,
  isRequired = true,
  isHidden = false,
  validationRegex,
  validationMsg,
  onValidate,
  onValidationChange,
  labelName,
  ref,
  accept,
  className,
  wrapperClassName,
}: InputProps) {
  const [isValid, setIsValid] = useState(true);

  function handleValidation(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    const valid =
      (!isRequired || e.target.value !== "") &&
      (!validationRegex || validationRegex.test(e.target.value)) &&
      (!onValidate || onValidate());

    setIsValid(valid);
    onValidationChange?.(valid);
  }

  return (
    <InputWrapper className={wrapperClassName ?? ""}>
      <div className="flex justify-between">
        <label>
          {labelName}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
        <p className={`${isValid ? "hidden" : "text-red-500 text-sm"}`}>
          {isValid ? "This field is required" : validationMsg}
        </p>
      </div>
      <input
        className={`border-[1.75px] ${isValid ? "border-border-color" : "border-red-500"} rounded-btn bg-primary-light p-1 ${isValid ? "focus:outline-primary" : "focus:outline-red-500"} ${
          className ?? ""
        }`}
        ref={ref}
        type={inputType}
        // {...(isRequired && { required: true })}
        {...(accept && { accept })}
        {...(isHidden && { hidden: true })}
        onChange={(e) => handleValidation(e)}
      />
    </InputWrapper>
  );
}
