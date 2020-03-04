import {injectGlobalStyle} from "../amplify-ui/styles/styles";
import {injectFontFaceStyles} from "./inject-font-face-styles";

export default () => {
  injectGlobalStyle();
  injectFontFaceStyles();
};
