import * as path from "path";
// @ts-ignore
import * as parse5 from "parse5";
import * as t from "../types";
import validTags from "./valid-tags.json";
import {Ctx} from "../types/ctx";

interface HTMLAttr {
  name: string;
  // eslint-disable-next-line
  value: any;
}

interface HTMLNode {
  nodeName: string;
  tagName?: string;
  childNodes?: HTMLNode[];
  attrs?: HTMLAttr[];
  value?: string;
}

const normalizeId = (id: string): string => {
  if (!isNaN(parseInt(id.charAt(0)))) {
    return `n${id}`;
  }
  return id;
};

const Attrs = (attrs: HTMLAttr[]): Record<string, unknown> | null => {
  return attrs && attrs.length > 0
    ? attrs.reduce((acc, {name, value}) => {
        return {...acc, [name]: value};
      }, {})
    : null;
};

const Hyperscript = (
  ctx: Ctx,
  node: HTMLNode,
  attributes: t.Page,
  srcPath: string,
): t.HyperscriptNode | t.Falsy => {
  if (node.nodeName === "#text") {
    return node.value as string;
  }

  if (node.nodeName === "#comment") {
    return null;
  }

  if (node.tagName) {
    if (!validTags[node.tagName] && !node.tagName.startsWith("amplify-")) {
      throw new Error(
        `Invalid tag "${
          node.tagName
        }" encountered in "${srcPath}". See instructions on adding valid tags at "${path.resolve(
          ctx.config.cwd as string,
          "Readme.md#adding-to-valid-tag-list",
        )}"`,
      );
    }
  } else {
    throw new Error(
      `Undefined is not a valid tag name, encountered in "${srcPath}". No info:\n${node}`,
    );
  }

  const props = node.attrs ? Attrs(node.attrs) : null;
  if (props?.style) {
    throw new Error(`'style' attribute used in "${srcPath}"`);
  }

  const children =
    node.childNodes && node.childNodes.length > 0
      ? // eslint-disable-next-line
        node.childNodes.reduce((acc: any, childNode: any) => {
          const hyperscriptNode = Hyperscript(
            ctx,
            childNode,
            attributes,
            srcPath,
          );
          switch (hyperscriptNode) {
            case undefined:
            case null:
            case false:
              return acc;
            default:
              return [...acc, hyperscriptNode];
          }
        }, new Array<t.HyperscriptNode>())
      : new Array<t.HyperscriptNode>();

  const hyperscriptNode = [
    node.tagName,
    props,
    ...children,
  ] as t.HyperscriptNode;
  switch (node.tagName) {
    case "table": {
      return ["div", {class: "table-container"}, hyperscriptNode];
    }
    case "h2":
    case "h3": {
      // @ts-ignore
      if (props?.id) {
        // @ts-ignore
        props.id = normalizeId(props.id);
        // @ts-ignore
        return attributes.disableLinkification
          ? hyperscriptNode
          : ["docs-in-page-link", {targetId: props?.id}, hyperscriptNode];
      }
      break;
    }
    default:
      return hyperscriptNode;
  }
};

/**
 * Turns an HTML source string into an array of Hyperscript nodes
 */
export const htmlToHyperscript = (
  ctx: Ctx,
  html: string,
  srcPath: string,
  attributes: t.Page,
): t.HyperscriptNode[] => {
  if (html.trim().length <= 0)
    throw new Error(`Markdown files cannot be empty ("${srcPath}")`);
  return parse5
    .parseFragment(html, {scriptingEnabled: true})
    .childNodes?.map((node: HTMLNode) =>
      Hyperscript(ctx, node, attributes, srcPath),
    );
};
