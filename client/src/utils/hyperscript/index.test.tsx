import {
  createVNode,
  createVNodeFromHyperscriptNode,
  createVNodesFromHyperscriptNodes,
} from ".";
import {h} from "@stencil/core";

describe("Hyperscript Utils", () => {
  describe("createVNode", () => {
    test("attribute & text child", () => {
      const a = <div id="id">text</div>;
      const b = createVNode("div", {id: "id"}, "text");
      expect(a).toEqual(b);
    });
  });

  describe("createVNodeFromHyperscriptNode", () => {
    test("attribute & text child", () => {
      const a = <div id="id">text</div>;
      const b = createVNodeFromHyperscriptNode(["div", {id: "id"}, "text"]);
      expect(a).toEqual(b);
    });

    test("attribute & children", () => {
      const a = (
        <div id="id">
          <div>first</div>
          <div>second</div>
        </div>
      );
      const b = createVNodeFromHyperscriptNode([
        "div",
        {id: "id"},
        ["div", null, "first"],
        ["div", null, "second"],
      ]);
      expect(a).toEqual(b);
    });

    test("attribute & grandchildren", () => {
      const a = (
        <div id="id">
          <div>
            <div>first</div>
            <div>second</div>
          </div>
          <div>
            <div>third</div>
            <div>fourth</div>
          </div>
        </div>
      );
      const b = createVNodeFromHyperscriptNode([
        "div",
        {id: "id"},
        ["div", null, ["div", null, "first"], ["div", null, "second"]],
        ["div", null, ["div", null, "third"], ["div", null, "fourth"]],
      ]);
      expect(a).toEqual(b);
    });
  });

  describe("createVNodesFromHyperscriptNodes", () => {
    test("varying formats", () => {
      const a = [
        <div id="id">text</div>,
        <div id="id">
          <div>first</div>
          <div>second</div>
        </div>,
        <div id="id">
          <div>
            <div>first</div>
            <div>second</div>
          </div>
          <div>
            <div>third</div>
            <div>fourth</div>
          </div>
        </div>,
      ];
      const b = createVNodesFromHyperscriptNodes([
        ["div", {id: "id"}, "text"],
        ["div", {id: "id"}, ["div", null, "first"], ["div", null, "second"]],
        [
          "div",
          {id: "id"},
          ["div", null, ["div", null, "first"], ["div", null, "second"]],
          ["div", null, ["div", null, "third"], ["div", null, "fourth"]],
        ],
      ]);
      expect(a).toEqual(b);
    });
  });
});
