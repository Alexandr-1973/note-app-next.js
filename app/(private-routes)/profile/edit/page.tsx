"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { patchUser } from "@/lib/api/clientApi";
import { useState } from "react";

export default function ProfileEdit() {
  const router = useRouter();

  const { user, setUser } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
        e.target.value = "";
        setPreview(null);
        setFileName("");
        return;
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    // const formValues = Object.fromEntries(formData);

    if (user) {
      formData.append("email", user.email);
      const res = await patchUser(formData);
      // formValues.email = user.email;
      // const res = await patchUser(formValues as PatchRequest);

      if (res) {
        setUser(res);
        router.push("/profile");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user && (
          <Image
            src={preview ? preview : user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            unoptimized
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <h1 className={css.fileName}>
              {fileName ? "" : "Only for image file under 2MB"}
            </h1>
            <h1 className={css.fileName}>{fileName}</h1>
            <label className={css.fileUpload}>
              <span>Choose file to change avatar</span>
              <input
                id="avatarFile"
                type="file"
                name="avatar_file"
                className={css.hiddenInput}
                onChange={handleFileChange}
              />
            </label>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
