import React from "react";

export const headings = {
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  h5: heading("h5"),
};

function heading(type) {
  return function Heading({children}) {
    // TODO Slugify headings without IDs
    const match = /^.+(\s*\{#([a-z0-9\-_]+?)\}\s*)$/.exec(children) || [
      children,
      null,
      null,
    ];

    const id = match[2];

    return React.createElement(
      type,
      {
        id,
        className: "heading",
      },
      <a href={`#${id}`} aria-hidden>
        <svg
          aria-hidden="true"
          height="16"
          version="1.1"
          viewBox="0 0 16 16"
          width="16"
        >
          <path
            fillRule="evenodd"
            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
          ></path>
        </svg>
      </a>,
      children.replace(match[1], ""),
    );
  };
}
