import {
  useContext,
  useState,
  type InputHTMLAttributes,
  type Ref,
} from "react";
import InputWrapper from "./InputWrapper";
import { ThemeContext } from "~/context/ThemeContext";

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
  placeholder?: string;
  defaultValue?: string;
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
  placeholder,
  defaultValue,
}: InputProps) {
  const theme = useContext(ThemeContext).theme;
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function handleValidation(e: React.ChangeEvent<HTMLInputElement>) {
    let message = "";

    if (isRequired && e.target.value === "") {
      message = "This field is required";
    } else if (validationRegex && !validationRegex.test(e.target.value)) {
      message = validationMsg ?? "Invalid value";
    } else if (onValidate && !onValidate()) {
      message = validationMsg ?? "Invalid value";
    }

    const valid = message === "";

    setIsValid(valid);
    setErrorMessage(message);
    onValidationChange?.(valid);
  }

  return (
    <InputWrapper className={wrapperClassName ?? ""}>
      <div
        className={`flex justify-between ${
          theme === "Light" ? "text-primary-dark" : "text-primary-light"
        }`}
      >
        <label>
          {labelName}
          {isRequired && <span className="text-red-500">*</span>}
        </label>

        <p className={`${isValid ? "hidden" : "text-red-500 text-sm"}`}>
          {errorMessage}
        </p>
      </div>

      <input
        className={`
          border-[1.75px]
          ${
            isValid
              ? theme === "Light"
                ? "border-border-color bg-primary-light text-primary-dark"
                : "border-border-color-dark bg-primary-dark text-primary-light"
              : "border-red-500"
          }
          rounded-btn
          p-1
          ${isValid ? "focus:outline-primary" : "focus:outline-red-500"}
          ${className ?? ""}
        `}
        ref={ref}
        type={inputType}
        {...(accept && { accept })}
        {...(isHidden && { hidden: true })}
        onChange={handleValidation}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </InputWrapper>
  );
}
