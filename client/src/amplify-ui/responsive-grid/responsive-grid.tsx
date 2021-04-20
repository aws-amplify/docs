import {Component, h, Host, Prop, Watch, State} from "@stencil/core";
import {ColumnCountByBreakpoint} from "./responsive-grid.types";
import {css, cx} from "emotion";
import {createMQ, Breakpoint} from "../styles/media";
import {responsiveGridStyle} from "./responsive-grid.style";

@Component({tag: "amplify-responsive-grid", shadow: false})
export class AmplifyResponsiveGrid {
  /** how much space in between grid items (ems) */
  @Prop() readonly gridGap: number = 2;
  /** default column count for laptop */
  @Prop() readonly columns: number = 3;

  /** a dictionary of what column counts to apply at given breakpoints */
  @State() columnCountByBreakpoint: ColumnCountByBreakpoint;

  @State() computedStyle?: string;

  @Watch("columnCountByBreakpoint")
  computeStyle() {
    this.computedStyle = cx(
      responsiveGridStyle,
      css`
        grid-gap: ${this.gridGap}rem;
      `,
      ...Object.entries(this.columnCountByBreakpoint).map(
        ([breakpoint, columnCount]) => css`
          ${createMQ((breakpoint as any) as number)} {
            -ms-grid-columns: ${new Array(columnCount).fill("1fr").join(" ")};
            grid-template-columns: repeat(${columnCount}, 1fr);
          }
        `,
      ),
    );
  }

  componentWillLoad() {
    this.columnCountByBreakpoint = {
      [Breakpoint.LAPTOP]: this.columns,
    };
    this.computeStyle();
  }

  public render() {
    return (
      <Host class={this.computedStyle}>
        <slot />
      </Host>
    );
  }
}
