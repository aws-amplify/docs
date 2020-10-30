import {JsonDocsComponent} from "@stencil/core/internal";
import {h} from "@stencil/core";
import {tableStyle, tableHeaderStyle} from "./ui-component-props.style";
import {
  WebComponentProps,
  TableGenerator,
  DocsBaseEntry,
} from "./ui-component-props.types";

/**
 * Both css and slots only document name and description, so we can share
 * the table generation logic here.
 */
const createBaseTable = <T extends DocsBaseEntry>(entries: T[]) => {
  if (!entries) return undefined;
  const rows = entries.map((entry, index) => {
    const name = entry.name;
    const description = entry.docs;
    if (!name || !description) return undefined;
    return (
      <tr key={index}>
        <td>
          <code>{name}</code>
        </td>
        <td>{description}</td>
      </tr>
    );
  });
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

/**
 * For attributes, we need to document more information than the base ones,
 * so we create multiple tables.
 */
const attrTableGenerator: TableGenerator = (docs: JsonDocsComponent) => {
  let count = 0;
  const tables = docs?.props.map((prop) => {
    const groupId = `prop-${prop.attr || String(count)}`;
    if (!prop.attr) {
      count++;
    }

    return (
      <div>
        <table class={tableStyle} key={groupId}>
          <thead>
            <tr>
              <th colSpan={2}>
                <div class={tableHeaderStyle}>{prop.name}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {prop.attr && (
              <tr>
                <th>Attribute</th>
                <td>{prop.attr}</td>
              </tr>
            )}
            <tr>
              <th>Description</th>
              <td>{prop.docs}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{prop.type}</td>
            </tr>
            {prop.default && (
              <tr>
                <th>Default</th>
                <td>{prop.default}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  });
  return tables;
};

const cssTableGenerator: TableGenerator = (docs: JsonDocsComponent) => {
  return createBaseTable(docs.styles);
};

const slotsTableGenerator: TableGenerator = (docs: JsonDocsComponent) => {
  return createBaseTable(docs.slots);
};

export const tableGeneratorMap: Record<WebComponentProps, TableGenerator> = {
  attr: attrTableGenerator,
  css: cssTableGenerator,
  slots: slotsTableGenerator,
};
