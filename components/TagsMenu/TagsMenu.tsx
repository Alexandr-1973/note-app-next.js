"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";

interface TagMenuProps {
	categories: string[]
}

export default function TagsMenu({categories}:TagMenuProps) {
  const [isOpenButton, setIsOpenButton] = useState(false);
  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpenButton(!isOpenButton)}
      >
        Notes ▾
      </button>
      {isOpenButton && (
        <ul className={css.menuList}>
          {categories.map(
            (tag, index) => {
              return (
                <li key={index} className={css.menuItem}>
                  <Link
                    href={`/notes/filter/${tag}`}
                    className={css.menuLink}
                    onClick={() => setIsOpenButton(!isOpenButton)}
                  >
                    {tag}
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
}
