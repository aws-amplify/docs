import s from "./note.module.css"

export function Note({ height }) {
  return (
    <div className={s.container} style={{ height }}>
      <h2 className={s.title}>About this tutorial</h2>
      <p>This tutorial was built as a demo of Code Hike.</p>
      <p>
        The original content and style come from the
        official "Intro to React" adapted by "React with
        Hooks".
      </p>
      <div>
        <a
          href="https://reactjs.org/tutorial/tutorial.html"
          className={s.link}
        >
          Official Intro to React <Arrow />
        </a>
        <a
          href="https://reactwithhooks.netlify.app/tutorial/tutorial.html"
          className={s.link}
        >
          React with Hooks <Arrow />
        </a>
        <a href="https://codehike.org" className={s.link}>
          Code Hike <Arrow />
        </a>
        <a
          href="https://github.com/code-hike/react-tutorial-demo"
          className={s.link}
        >
          Source Code <Arrow />
        </a>
      </div>
    </div>
  )
}

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="11"
      viewBox="0 0 4.537 8.697"
    >
      <path
        fill="currentColor"
        d="M.183 8.697a.181.181 0 01-.13-.31L4.098 4.34.054.3A.181.181 0 01.31.044l4.174 4.174a.181.181 0 010 .256L.31 8.648a.181.181 0 01-.127.049z"
      ></path>
    </svg>
  )
}
