import * as t from "../types";

const IS_URL_ABSOLUTE_REGEX = /^https?:\/\//i;

export const imageReferences: t.Transformer = ({
  node,
  srcPath,
  lexicalScope,
  ctx,
}) => {
  if (Array.isArray(node) && node[0] === "img" && !!node[0]) {
    const [tag, props, ...children] = node;
    // eslint-disable-next-line
    // @ts-ignore
    const {src} = props;

    if (src && !IS_URL_ABSOLUTE_REGEX.test(src)) {
      let uri: string | undefined;

      try {
        uri = ctx.resolvePathDeduction(src, srcPath, "image")?.uri as string;
      } catch (e) {
        console.log("\x1b[33m%s\x1b[0m", e.message.split("\n")[0]);
        uri = "";
      }

      uri && lexicalScope.update([tag, {...props, src: uri}, ...children]);
    }
  }
};
