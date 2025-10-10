import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteSpace</p>
        <p>
          <a href="mailto:oleksandr.v.bilokur@gmail.com">Contact</a>
        </p>
      </div>
    </footer>
  );
}
