import {injectGlobal} from "emotion";

const Bd = "Amazon_Ember_Bd.ttf";
const BdIt = "Amazon_Ember_BdIt.ttf";
const Lt = "Amazon_Ember_Lt.ttf";
const LtIt = "Amazon_Ember_LtIt.ttf";
const Rg = "Amazon_Ember_Rg.ttf";
const RgIt = "Amazon_Ember_RgIt.ttf";
const Th = "Amazon_Ember_Th.ttf";
const ThIt = "Amazon_Ember_ThIt.ttf";

const createFontFaceStyle = (src: string, weight?: number, style?: string) => {
  return `
    @font-face {
      font-family: Amazon Ember;
      src: url(/fonts/${src});
      ${weight ? `font-weight: ${String(weight)};` : ""}
      ${style ? `font-style: ${style};` : ""}
    }
  `;
};

export const injectFontFaceStyles = () =>
  injectGlobal`
    ${[
      [Th, 100, "normal"],
      [ThIt, 100, "italic"],
      [Lt, 300, "normal"],
      [LtIt, 300, "italic"],
      [Rg, 500, "normal"],
      [RgIt, 500, "italic"],
      [Bd, 700, "normal"],
      [BdIt, 700, "italic"],
    ]
      .map((args) => createFontFaceStyle(...(args as [string, number, string])))
      .join("")}
  `;
