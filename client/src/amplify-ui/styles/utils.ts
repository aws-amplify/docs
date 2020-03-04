import {css} from "emotion";
import {flatten} from "array-flatten";

const boxUtils = css`
  ${flatten(
    ["margin", "padding"].map((prop) =>
      ["top", "right", "bottom", "left"].map((side) =>
        [
          {abr: "sm", rems: 0.5},
          {abr: "md", rems: 1},
          {abr: "lg", rems: 2},
        ].map(
          ({abr, rems}) => `
            .${prop}-${side}-${abr} {
              ${prop}-${side}: ${String(rems)}rem;
            }
          `,
        ),
      ),
    ),
  ).join("\n")}
`;

const backgroundUtils = css`
  .background-color {
    background-color: var(--bg-color);
  }

  .background-color-secondary {
    background-color: var(--bg-color-secondary);
  }

  .background-color-tertiary {
    background-color: var(--bg-color-tertiary);
  }

  ${[
    "black",
    "white",
    "grey-lt",
    "grey-md",
    "grey-hv",
    "orange-hv",
    "off-white",
  ]
    .map(
      (color) => `
        .background-color-${color} {
          background-color: var(--color-${color});
        }
      `,
    )
    .join("\n")}
`;

const colorUtils = css`
  ${["black", "white", "grey-lt", "grey-md", "grey-hv", "orange-hv"]
    .map(
      (color) => `
        .color-${color} {
          color: var(--color-${color});
        }
      `,
    )
    .join("\n")}
`;

const fontWeights = css`
  ${[100, 300, 500, 700]
    .map(
      (fontWeight) => `
        .font-weight-${String(fontWeight)} {
          font-weight: ${fontWeight};
        }
      `,
    )
    .join("\n")}
`;

const textAlignments = css`
  ${["left", "center", "right"].map(
    (alignment) => `
      .text-align-${alignment} {
        text-align: ${alignment};
      }
    `,
  )}
`;

export const utilsStyle = css`
  ${boxUtils}
  ${backgroundUtils}
  ${colorUtils}
  ${fontWeights}
  ${textAlignments}

  .three-dee-effect {
    box-shadow: rgba(0, 0, 0, 0.09) 0.3125rem 0.3125rem 0 -0.0625rem, 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.15);
  }

  .border-radius {
    border-radius: 0.25rem;
  }

  .scale-up-on-hover {
    transition: 0.125s ease transform;
    &:hover {
      transform: scale(1.0625);
    }
  }

  .overflow-x {
    overflow-x: auto;
  }

  .text-align-center {
    text-align: center;
  }

  .padding-horizontal-md {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`;
