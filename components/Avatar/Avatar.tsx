"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Avatar.module.css";

export default function Avatar({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.avatarWrapper}>
      {!loaded && <div className={styles.loader}></div>}
      <Image
        src={src}
        alt="User Avatar"
        width={120}
        height={120}
        className={`${styles.avatar} ${loaded ? styles.visible : ""}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}