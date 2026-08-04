import { useContext, useState, type Ref } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import profilePicturePlaceholder from "../assets/profilePicturePlaceholder.svg";
import { UserContext } from "~/context/UserContext";

type FileInputProps = {
  accept?: string;
  hidden?: boolean;
  required?: boolean;
  wrapperClassName?: string;
  ref: Ref<HTMLInputElement>;
  labelName: string;
};

export default function FileInput({
  accept = "image/*",
  hidden = true,
  required = true,
  ref,
  labelName,
  wrapperClassName,
}: FileInputProps) {
  const user = useContext(UserContext)?.user;
  const theme = useContext(ThemeContext).theme;
  const [img, setImg] = useState(
    user?.profilePictureURL || profilePicturePlaceholder,
  );

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (file) setImg(URL.createObjectURL(file));
  }

  return (
    <div
      className={`w-full flex items-center justify-between rounded-btn border
         ${
           theme === "Light"
             ? " border-border-color bg-primary-light"
             : " border-border-color-dark bg-primary-dark"
         } p-3 ${wrapperClassName ?? ""}`}
    >
      <label
        htmlFor="profileInput"
        className="cursor-pointer rounded-btn bg-primary px-4 py-2 text-primary-light transition hover:bg-primary-hover"
      >
        {labelName ?? "Upload Profile Picture"}
      </label>

      <input
        onChange={(e) => handleInputChange(e)}
        id="profileInput"
        className="hidden"
        ref={ref}
        type="file"
        {...(required && { required: true })}
        {...(accept && { accept })}
        {...(hidden && { hidden: true })}
      />

      <img
        className={`h-16 w-16 rounded-full border-2 border-border-color object-cover shadow-md`}
        src={img}
        alt="User avatar"
      />
    </div>
  );
}
