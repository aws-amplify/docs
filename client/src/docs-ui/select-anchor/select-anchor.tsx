import {
  Component,
  Host,
  h,
  Prop,
  State,
  Listen,
  Element,
  Watch,
  VNode,
} from "@stencil/core";
import {Page} from "../../api";
import {
  filterMetadataByOptionByName,
  FilterOptionMetadata,
} from "../../utils/filter-data";
import {getFilterKeyFromPage} from "../../utils/filters";
import {
  currentlySelectedStyle,
  optionsStyle,
  selectAnchorStyle,
  showOptionsStyle,
} from "./select-anchor.style";
import {SelectedFilters} from "../../docs-ui/page/page.types";
import {pageContext} from "../../docs-ui/page/page.context";
import {sidebarLayoutContext} from "../../amplify-ui/sidebar-layout/sidebar-layout.context";
import {ToggleInView} from "../../amplify-ui/sidebar-layout/sidebar-layout.types";
import {MQTablet} from "../../amplify-ui/styles/media";

@Component({tag: "docs-select-anchor"})
export class DocsSelectAnchor {
  @Element() element: HTMLElement;
  /*** the globally-selected filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /** the current page's data */
  @Prop() readonly page?: Page;
  /*** whether or not the menu is in view */
  @Prop() readonly inView?: boolean;
  /*** the menu toggle */
  @Prop() readonly toggleInView: ToggleInView;

  @State() showOptions = false;
  @State() sortedVersions?: [string, string][];

  selectedOption: SelectedFilters[keyof SelectedFilters];
  selectedOptionMetadata?: FilterOptionMetadata;
  options?: VNode[];

  toggleShowOptions = () => {
    this.showOptions = !this.showOptions;
  };

  toggleShowOptionsAndMenuInView = () => {
    this.toggleShowOptions();

    // Slice off the "@media " string at the start for use in JS instead of CSS
    const MQTabletJS = MQTablet.substring(6);
    const isMobile = !window.matchMedia(MQTabletJS).matches;
    if (isMobile && this.inView) {
      this.toggleInView();
    }
  };

  componentWillLoad() {
    this.computeVersions();
  }

  @Watch("page")
  computeAll() {
    this.computeOptionVNodes();
    this.computeVersions();
  }

  computeOptionVNodes() {
    const filterKey = this.page && getFilterKeyFromPage(this.page);
    this.selectedOption = filterKey && this.selectedFilters?.[filterKey];
    this.selectedOptionMetadata =
      filterKey &&
      this.selectedOption &&
      (filterMetadataByOptionByName[filterKey][
        this.selectedOption
      ] as FilterOptionMetadata);

    this.options =
      this.sortedVersions &&
      (this.sortedVersions.map(([filterValue, filterRoute]) => {
        if (filterValue !== this.selectedOption) {
          const optionMetadata =
            filterKey &&
            (filterMetadataByOptionByName[filterKey][
              filterValue
            ] as FilterOptionMetadata);
          return (
            optionMetadata && (
              <stencil-route-link
                key={filterValue}
                url={filterRoute}
                onClick={this.toggleShowOptionsAndMenuInView}
              >
                <img
                  src={optionMetadata.graphicURI}
                  alt={`${optionMetadata.label} Logo`}
                />
                <span>{optionMetadata.label}</span>
              </stencil-route-link>
            )
          );
        }
      }) as VNode[] | undefined);
  }

  computeVersions() {
    if (this.page?.versions) {
      const entries = Object.entries(this.page.versions);
      entries.sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0));
      this.sortedVersions = entries;
      this.computeOptionVNodes();
    }
  }

  @Listen("click", {target: "window"})
  closeOnOuterClick(e: Event) {
    if (!(e && this.element.contains(e.target as HTMLElement))) {
      this.showOptions = false;
    }
  }

  render() {
    return (
      this.selectedOptionMetadata &&
      this.selectedOption && (
        <Host class={selectAnchorStyle}>
          <div class={currentlySelectedStyle}>
            <stencil-route-link
              activeClass={undefined}
              onClick={this.toggleShowOptions}
            >
              <img
                src={this.selectedOptionMetadata.graphicURI}
                alt={`${this.selectedOptionMetadata.label} Logo`}
              />
              <span>{this.selectedOptionMetadata.label}</span>
            </stencil-route-link>
          </div>
          <div
            class={{[optionsStyle]: true, [showOptionsStyle]: this.showOptions}}
          >
            {this.options}
          </div>
        </Host>
      )
    );
  }
}

pageContext.injectProps(DocsSelectAnchor, ["selectedFilters"]);
sidebarLayoutContext.injectProps(DocsSelectAnchor, ["inView", "toggleInView"]);
