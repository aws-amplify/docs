import {Component, Host, h, Prop, State, Listen, Element} from "@stencil/core";
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
import {parseURL} from "../../utils/url/url";

const rereouteCache = new Map<string, string>();

const rerouteIfNecessary = (path: string) => {
  if (rereouteCache.has(path)) {
    return rereouteCache.get(path);
  }
  const rerouted = (() => {
    if (
      path.includes("/lib") &&
      (path.includes("/q/platform/ios") || path.includes("/q/platform/android"))
    ) {
      return `/sdk/q/platform/${parseURL(path).params?.platform as string}`;
    }
    return path;
  })();
  rereouteCache.set(path, rerouted);
  return rerouted;
};

@Component({tag: "docs-select-anchor"})
export class DocsSelectAnchor {
  @Element() element: HTMLElement;
  /*** the globally-selected filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /** the current page's data */
  @Prop() readonly page?: Page;

  @State() showOptions = false;
  @State() sortedVersions?: [string, string][];

  toggleShowOptions = () => {
    this.showOptions = !this.showOptions;
  };

  componentWillLoad() {
    if (this.page?.versions) {
      const entries = Object.entries(this.page.versions);
      entries.sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0));
      this.sortedVersions = entries;
    }
  }

  // @ts-ignore
  @Listen("click", {target: "window"})
  closeOnOuterClick(e: Event) {
    if (!(e && this.element.contains(e.target as HTMLElement))) {
      this.showOptions = false;
    }
  }

  render() {
    const filterKey = this.page && getFilterKeyFromPage(this.page);
    const selectedOption = filterKey && this.selectedFilters?.[filterKey];
    const selectedOptionMetadata =
      filterKey &&
      selectedOption &&
      (filterMetadataByOptionByName[filterKey][
        selectedOption
      ] as FilterOptionMetadata);

    return (
      selectedOptionMetadata &&
      selectedOption && (
        <Host class={selectAnchorStyle}>
          <div class={currentlySelectedStyle}>
            <stencil-route-link
              activeClass={undefined}
              onClick={this.toggleShowOptions}
            >
              <img
                src={selectedOptionMetadata.graphicURI}
                alt={`${selectedOptionMetadata.label} Logo`}
              />
              <span>{selectedOptionMetadata.label}</span>
            </stencil-route-link>
          </div>
          <div
            class={{[optionsStyle]: true, [showOptionsStyle]: this.showOptions}}
          >
            {this.sortedVersions?.map(([filterValue, filterRoute]) => {
              if (filterValue !== selectedOption) {
                const meta =
                  filterKey &&
                  (filterMetadataByOptionByName[filterKey][
                    filterValue
                  ] as FilterOptionMetadata);
                return (
                  meta && (
                    <stencil-route-link
                      key={filterValue}
                      url={rerouteIfNecessary(filterRoute)}
                      onClick={this.toggleShowOptions}
                    >
                      <img src={meta.graphicURI} alt={`${meta.label} Logo`} />
                      <span>{meta.label}</span>
                    </stencil-route-link>
                  )
                );
              }
            })}
          </div>
        </Host>
      )
    );
  }
}

pageContext.injectProps(DocsSelectAnchor, ["selectedFilters"]);
