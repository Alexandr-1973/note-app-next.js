import Link from "next/link";
import css from "./SidebarNotes.module.css";

export default async function SidebarNotes() {
  return (

    
    <ul className={css.menuList}>
      {["All", "Todo", "Work", "Personal", "Meeting", "Shopping"].map(
        (tag, index) => {
          return (
            <li key={index} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                
              >
                {tag}
              </Link>
            </li>
          );
        }
      )}
     
    </ul>
  );
}
