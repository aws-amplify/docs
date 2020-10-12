import {JsonDocsComponent} from "@stencil/core/internal";
import {h} from "@stencil/core";
import {tableStyle, tableHeaderStyle} from "./ui-component-props.style";
import {PropType, TableGenerator} from "./ui-component-props.types";

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

const slotsTableGenerator: TableGenerator = (docs: JsonDocsComponent) => {
  console.log(docs);
  return <div></div>;
};

const cssTableGenerator: TableGenerator = () =>
  // useTableHeaders: boolean,
  // docs: JsonDocsComponent,
  {
    return <div></div>;
  };

export const tableGeneratorMap: Record<PropType, TableGenerator> = {
  attr: attrTableGenerator,
  css: cssTableGenerator,
  slots: slotsTableGenerator,
};
