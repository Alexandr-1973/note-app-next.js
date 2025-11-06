import css from "./page.module.css";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteSpace</h1>
        <p className={css.description}>
          NoteSpace is a modern web app for capturing and organizing your notes
          with ease. Whether it’s work projects, study materials, or daily
          thoughts, NoteSpace keeps everything clear and accessible in one
          place. The interface is simple and distraction-free, helping you focus
          on what matters — your ideas. Add tags and keywords to quickly find
          any note, even among hundreds. Built-in search and smooth navigation
          make it effortless to manage both quick reminders and long-form texts.
          NoteSpace evolves constantly, improving performance and usability.
          It’s a focused, dependable space for people who value clarity and
          productivity.
        </p>

        <div className={css.videoContainer}>
          <h2 className={css.videoTitle}>Watch how it works 🎥</h2>
          <video
            className={css.video}
            controls
            preload="none"
            playsInline
            poster="https://res.cloudinary.com/dvojqixys/image/upload/vYOUR_POSTER_ID.jpg"
          >
            <source
              src="https://res.cloudinary.com/dvojqixys/video/upload/v1762468537/Demo_rtnm8p.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
}
