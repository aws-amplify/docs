import {Component, Host, h, Prop} from "@stencil/core";
import {Page} from "../../api";
import {getFilterKeyFromPage} from "../../utils/filters";
import {filterMetadataByOptionByName} from "../../utils/filter-data";
import {internalLinkContext} from "../internal-link/internal-link.context";
import {SetCurrentPath} from "../internal-link/internal-link.types";

const getRoute = (
  initialRoute: string,
  filterKey: string,
  filterValue: string,
): string => {
  switch (filterValue) {
    case "js": {
      if (initialRoute.startsWith("/sdk")) {
        return "lib?platform=js";
      }
      break;
    }
    case "android":
    case "ios": {
      if (initialRoute.startsWith("/lib")) {
        return `/sdk?platform=${filterValue}`;
      }
      break;
    }
  }

  return `${initialRoute}?${filterKey}=${filterValue}`;
};

@Component({tag: "docs-choose-anchor"})
export class DocsChooseAnchor {
  /*** method to trigger the update of the currently-mounted `Page` */
  @Prop() readonly setCurrentPath?: SetCurrentPath;
  /*** the current page's data */
  @Prop() readonly page?: Page;

  createOnClick = (path: string | undefined) => () => {
    path && this.setCurrentPath && this.setCurrentPath(path);
  };

  render() {
    const filterKey = this.page && getFilterKeyFromPage(this.page);

    return (
      <Host>
        <amplify-responsive-grid
          gridGap={1}
          columns={4}
          class="border-radius margin-top-md"
        >
          {filterKey &&
            Object.entries(filterMetadataByOptionByName[filterKey]).map(
              ([filterValue, {label, graphicURI}]) => {
                const route =
                  this.page?.route &&
                  getRoute(this.page.route, filterKey, filterValue);

                return (
                  <amplify-card
                    key={label}
                    vertical
                    onClick={this.createOnClick(route)}
                    url={route}
                  >
                    <img
                      slot="graphic"
                      src={graphicURI}
                      alt={`${label} Logo`}
                    />
                    <h4 slot="heading">{label}</h4>
                  </amplify-card>
                );
              },
            )}
        </amplify-responsive-grid>
      </Host>
    );
  }
}

internalLinkContext.injectProps(DocsChooseAnchor, ["setCurrentPath"]);
