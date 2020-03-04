import {injectGlobal} from "emotion";
import {variablesStyle} from "./variables";
import {normalizeStyle} from "./normalize";
import {elementsStyle} from "./elements";
import {utilsStyle} from "./utils";

export const injectGlobalStyle = () =>
  injectGlobal`
    ${variablesStyle}
    ${normalizeStyle}
    ${elementsStyle}
    ${utilsStyle}
  `;
