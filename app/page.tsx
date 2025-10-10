import css from "./page.module.css";

export default function Home() {
  return (
    // <main className={css.main}>
    //   <div className={css.container}>
    //     <h1 className={css.title}>Welcome to NoteHub</h1>
    //     <p className={css.description}>
    //       NoteHub is a simple and efficient application designed for managing
    //       personal notes. It helps keep your thoughts organized and accessible
    //       in one place, whether you are at home or on the go.
    //     </p>
    //     <p className={css.description}>
    //       The app provides a clean interface for writing, editing, and browsing
    //       notes. With support for keyword search and structured organization,
    //       NoteHub offers a streamlined experience for anyone who values clarity
    //       and productivity.
    //     </p>
    //   </div>
    // </main>
<main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Welcome to NoteSpace</h1>
    <p className={css.description}>
      NoteSpace is a modern web application designed to help you capture, organize,
      and manage your notes with ease. Whether you’re working on a project, 
      preparing study materials, or simply writing down your daily thoughts, 
      NoteHub provides a reliable space to keep everything structured and easy to find.
    </p>
    <p className={css.description}>
      The application combines simplicity with flexibility. You can create, edit,
      and browse your notes through a clear and distraction-free interface that
      focuses on what really matters — your ideas. Each note can include keywords
      and tags, allowing you to quickly locate important information even among
      hundreds of entries.
    </p>
    <p className={css.description}>
      With built-in search and smooth navigation, NoteSpace makes it effortless to
      manage both short reminders and long-form content. Whether you’re using it
      on your laptop at home or checking your notes from a mobile device, your
      workspace stays consistent and accessible at any moment.
    </p>
    <p className={css.description}>
      Our goal is to offer a tool that feels intuitive and dependable. NoteSpace is
      constantly improving, bringing small but meaningful updates focused on
      usability and performance. It’s the perfect solution for anyone who values
      clarity, focus, and productivity in their daily work.
    </p>
  </div>
</main>
  );
}
