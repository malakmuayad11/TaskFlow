import { useContext, useState, type Ref } from "react";
import Input from "./Input";
import { PASSWORD_REGX } from "~/services/validation";
import hideIconLight from "~/assets/hide-icon-light.svg";
import hideIconDark from "~/assets/hide-icon-dark.svg";
import viewIconLight from "~/assets/view-icon-light.svg";
import viewIconDark from "~/assets/view-icon-dark.svg";
import { ThemeContext } from "~/context/ThemeContext";

type PasswordInputProps = {
  passwordRef: Ref<HTMLInputElement>;
  labelName?: string;
  onValidationChange?: (isValid: boolean) => void;
  onValidate?: () => boolean;
  validationMsg?: string;
};

export default function PasswordInput({
  passwordRef,
  onValidationChange,
  labelName = "Password:",
  onValidate,
  validationMsg,
}: PasswordInputProps) {
  const theme = useContext(ThemeContext).theme;
  const [visible, setVisible] = useState(false);

  return (
    <Input
      inputType={visible ? "text" : "password"}
      labelName={labelName}
      ref={passwordRef}
      validationRegex={PASSWORD_REGX}
      validationMsg={
        validationMsg ??
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
      }
      onValidationChange={onValidationChange}
      {...(onValidate && { onValidate })}
      wrapperClassName="relative"
      className="pr-10"
    >
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute inset-y-0 right-2.5 z-10 flex items-center justify-center border-none bg-transparent p-0 cursor-pointer"
      >
        <img
          src={
            theme === "Light"
              ? visible
                ? hideIconDark
                : viewIconDark
              : visible
                ? hideIconLight
                : viewIconLight
          }
          alt={visible ? "Hide password" : "Show password"}
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          loading="eager"
        />
      </button>
    </Input>
  );
}
