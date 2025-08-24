"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { PatchRequest, patchUser } from "@/lib/api/clientApi";

export default function ProfileEdit() {
  const router = useRouter();

  const { user, setUser } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData);
    if (user) {
      formValues.email = user.email;

      const res = await patchUser(formValues as PatchRequest);

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
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: user_email@example.com</p>

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
