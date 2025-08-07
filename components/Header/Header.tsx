import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu categories={["All", "Todo", "Work", "Personal", "Meeting", "Shopping"]}/>
            {/* <Link href="/notes">Notes</Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}
