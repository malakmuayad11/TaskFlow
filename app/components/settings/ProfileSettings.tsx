import { useContext, useRef, useState } from "react";
import Input from "../Input";
import { EMAIL_REGX } from "~/services/validation";
import FileInput from "../FileInput";
import Button from "../Button";
import {
  getUserById,
  updateUser,
  updateUserProfile,
} from "~/services/indexedDB/userService";
import { UserContext } from "~/context/UserContext";
import Toast from "../Toast";
import { useToast } from "~/hooks/useToast";
import { ThemeContext } from "~/context/ThemeContext";
import { fileToBase64 } from "~/services/base64";
import profilePicturePlaceholder from "../../assets/profilePicturePlaceholder.svg";

export default function ProfileSettings() {
  const user = useContext(UserContext)?.user;
  const setUser = useContext(UserContext)?.setUser;
  const theme = useContext(ThemeContext).theme;
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useToast(showToast, setShowToast);

  async function handleSave() {
    if (
      !user ||
      !firstNameRef.current ||
      !lastNameRef.current ||
      !emailRef.current ||
      !profilePictureRef.current
    )
      return;

    if (
      firstNameRef.current?.value === "" ||
      lastNameRef.current?.value === "" ||
      emailRef.current?.value === ""
    ) {
      setToastMessage("Please fill all required fields.");
      setShowToast(true);
      return;
    }

    // Provide default profile picture placeholder
    const file = profilePictureRef.current.files?.[0];
    const profilePicture = file
      ? await fileToBase64(file)
      : profilePicturePlaceholder;

    try {
      if (user.email === emailRef.current.value) {
        const updatedUser = {
          userId: user.userId,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          profilePictureURL: profilePicture,
        };
        await updateUserProfile(updatedUser);
        const savedUser = await getUserById(user.userId);
        setUser?.({
          ...savedUser,
          password: user.password,
        });
      } else {
        const password = user.password;
        await updateUser({
          userId: user.userId,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          profilePictureURL: profilePicture,
        });
        const savedUser = await getUserById(user.userId);
        setUser?.({ ...savedUser, password });
      }
      setToastMessage("Profile data is updated sucessfully");
      setShowToast(true);
    } catch {
      setToastMessage("The email already exists. Use another email.");
      setShowToast(true);
    }
  }

  return (
    <>
      <section
        className={`grid grid-cols-1 md:grid-cols-2 gap-2 border ${
          theme === "Light"
            ? "border-border-color bg-bg-surface"
            : "border-border-color-dark bg-bg-surface-dark"
        } rounded-btn p-2`}
      >
        <h3 className="text-lg font-semibold col-span-2">Profile Data</h3>
        <Input
          inputType="text"
          labelName="First Name:"
          ref={firstNameRef}
          defaultValue={user?.firstName}
        />
        <Input
          inputType="text"
          labelName="Last Name:"
          ref={lastNameRef}
          defaultValue={user?.lastName}
        />
        <div className="col-span-1 md:col-span-2">
          <Input
            inputType="email"
            labelName="Email:"
            defaultValue={user?.email}
            ref={emailRef}
            validationRegex={EMAIL_REGX}
            validationMsg="Enter a valid email"
          />
        </div>
        <FileInput
          labelName="Profile Picture:"
          ref={profilePictureRef}
          wrapperClassName="col-span-1 md:col-span-2"
        />
        <Button
          content="Save"
          className="col-span-1 md:col-span-2"
          onClick={handleSave}
        />
      </section>

      {showToast && <Toast title={toastMessage} />}
    </>
  );
}
