import * as t from "../types";
import * as fs from "fs-extra";
import * as path from "path";
import {htmlToHyperscript} from "./html-to-hyperscript";
import marked from "marked";
import fm from "front-matter";
import * as prism from "prismjs";
import loadLanguages from "prismjs/components/";
import {Html5Entities} from "html-entities";

const entities = new Html5Entities();

const supportedLanguages = [
  "markup",
  "objectivec",
  "html",
  "xml",
  "css",
  "docker",
  "go",
  "ini",
  "js",
  "ts",
  "bash",
  "swift",
  "kotlin",
  "python",
  "java",
  "yaml",
  "ruby",
  "wasm",
  "rust",
  "json",
  "typescript",
  "javascript",
  "graphql",
  "diff",
  "jsx",
  "sql",
  "groovy",
  "dart",
];

loadLanguages(supportedLanguages);

const highlight = (code: string, language: string): string => {
  let highlighted = "";
  const languageIsSet = !!(language && language.trim().length > 0);

  if (languageIsSet && prism.languages[language]) {
    if (!supportedLanguages.includes(language)) {
      throw new Error(
        `No support for ${language} syntax highlighting. Contact Amplify JS team to request support.`,
      );
    }

    highlighted = prism.highlight(code, prism.languages[language], language);
  } else {
    highlighted = entities.encode(code);
  }

  const c = `<div slot="content" class="highlight highlight-source${
    languageIsSet ? `-${language}` : ""
  }">${highlighted}</div>`;

  return `<p class="searchable-code">${entities.encode(
    code,
  )}</p><amplify-code-block language="${language}" line-count="${String(
    c.split(/\r\n|\r|\n/).length,
  )}">${c}</amplify-code-block>`;
};

marked.setOptions({
  highlight,
  pedantic: false,
  gfm: true,
  breaks: false,
  smartLists: true,
  smartypants: true,
  xhtml: true,
  headerIds: true,
});

export async function initNode(srcPath: string, ctx: t.Ctx): Promise<void> {
  const pathDeduction = ctx.pathDeductionBySrcPath.get(srcPath);
  if (pathDeduction) {
    /**
     * If it's a markdown file, we transform its body contents into Hyperscript.
     * Eventually, we also save it within the context.
     */
    try {
      if (pathDeduction.extension === ".md") {
        const contents = (await fs.readFile(srcPath)).toString();
        const {body: markdownBody, attributes} = fm<t.Page>(contents);
        const htmlBody = marked(markdownBody);
        const body = htmlToHyperscript(ctx, htmlBody, srcPath, attributes);
        // @ts-ignore
        if (attributes.disableLinkification) {
          // @ts-ignore
          delete attributes.disableLinkification;
        }

        /**
         * If it's a page, it will have a route.
         */
        if (pathDeduction.route) {
          /**
           * It it's a page, it must have a title and description.
           */
          if (!attributes.title || !attributes.description) {
            throw new Error(
              [
                "Page frontmatter must contain a `title` and `description` property (",
                srcPath,
                `")`,
              ].join(""),
            );
          }
          ctx.pageBySrcPath.set(srcPath, {
            // @ts-ignore
            route: pathDeduction.route,
            // @ts-ignore
            body,
            ...attributes,
          });
        } else {
          if (Object.keys(attributes).length > 0) {
            throw new Error(
              ["Fragments cannot contain frontmatter (", srcPath, `")`].join(
                "",
              ),
            );
          }
          ctx.fragmentBySrcPath.set(srcPath, body);
        }
      } else if (pathDeduction.extension !== ".json") {
        /**
         * If it's not a markdown or json file, we copy it to the public dir.
         */
        await fs.ensureDir(
          path.dirname(pathDeduction.destinationPath as string),
        );
        await fs.copyFile(srcPath, pathDeduction.destinationPath as string);
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}
