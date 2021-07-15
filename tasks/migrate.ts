import * as fs from "fs-extra";
import fg from "fast-glob";
import mkdirp from "mkdirp";

const grab = function() {
  let count = 0;
  for (const chunk of fg.sync("docs/**/*.md", {
    cwd: "./",
  })) {
    count += 1;
    if (count > 15) break;
    let toWrite = "";
    let destination = chunk.slice(5); // slice off docs/
    let file = fs.readFileSync(chunk).toString();
    if (chunk.includes("fragments")) {
      destination = destination.split("fragments").join("");
      destination = "src/fragments" + destination + "x";
    } else {
      const frontMatter = file.split("---")[1].split("\n");
      file = file.split("---")[2];
      let filterKey = "";
      toWrite += "export const meta = {\n";
      for (const line of frontMatter) {
        const [key, value] = line.split(": ");
        if (typeof key === "undefined" || typeof value === "undefined")
          continue;
        if (key === "filterKey") filterKey = value;
        toWrite += `  ${key}: "${value}",\n`;
      }

      if (filterKey === "") {
        if (destination.includes("/start/")) {
          filterKey = "integration";
        } else if (destination.includes("/lib/")) {
          filterKey = "platform";
        } else if (destination.includes("/sdk/")) {
          filterKey = "platform";
        } else if (destination.includes("/ui/")) {
          filterKey = "framework";
        } else if (destination.includes("/guides/")) {
          filterKey = "platform";
        }
      }
      toWrite += "};\n\n";

      destination = destination.slice(0, -3); // slice off .md
      if (filterKey === "") {
        // /cli/ and /console/
        destination = "src/pages/" + destination + ".mdx";
      } else {
        destination =
          "src/pages/" + destination + `/q/${filterKey}/[${filterKey}].mdx`;
      }
    }

    // inline-fragment -> Fragments
    // <inline-fragment src="~/{1}/fragments{2}"></inline-fragment> ->
    //   import all from "/src/fragments/{1}{2}x";
    //   <Fragments fragments={all: all} />
    file = file.replace(
      /<inline-fragment src="~\/(.*?)\/fragments(.*?)"><\/inline-fragment>/g,
      `\n\nimport all from "/src/fragments/$1$2x";\n
<Fragments fragments={all: all} />`,
    );

    // <inline-fragment platform/integration="{1}" src="~/{2}/fragments{3}"></inline-fragment> ->
    //   import {1} from "/src/fragments/{2}{3}x";
    //   <Fragments fragments={{1}: {1}} />
    file = file.replace(
      /<inline-fragment .*?="(.*?)" src="~\/(.*?)\/fragments(.*?)"><\/inline-fragment>/g,
      `\n\nimport $1 from "/src/fragments/$2$3x";\n
<Fragments fragments={$1: $1} />`,
    );

    // amplify-block + amplify-block-switcher -> CodeBlock + BlockSwitcher
    file = file.split("amplify-block-switcher").join("BlockSwitcher");
    file = file.split("amplify-block").join("CodeBlock");

    // amplify-callout -> Callout
    file = file.split("amplify-callout").join("Callout");

    // amplify-responsive-grid -> Grid
    file = file.split("amplify-responsive-grid").join("Grid");

    // docs-card -> Card
    file = file.split("docs-card").join("Card");

    // docs-internal-link-button -> InternalLinkButton
    file = file.split("docs-internal-link-button").join("InternalLinkButton");

    // docs-hero -> Hero
    file = file.split("docs-hero").join("Hero");

    // docs-footer -> Footer
    file = file.split("docs-footer").join("Footer");

    // docs-container -> Container
    file = file.split("docs-container").join("Container");

    // docs-filter -> FilterContent
    file = file.split("docs-filter").join("FilterContent");

    // links
    file = file.split("(~").join("(");
    file = file.split(".md)").join(")");

    try {
      mkdirp.sync(
        destination
          .split("/")
          .slice(0, -1)
          .join("/"),
      );
    } catch (e) {}
    fs.writeFileSync(destination, toWrite + file);
  }
};

grab();
