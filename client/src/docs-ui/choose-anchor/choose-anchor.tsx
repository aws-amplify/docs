import {Component, Host, h, Prop} from "@stencil/core";
import {Page} from "../../api";
import {getFilterKeyFromPage} from "../../utils/filters";
import {filterMetadataByOptionByName} from "../../utils/filter-data";

const getRoute = (
  initialRoute: string,
  filterKey: string,
  filterValue: string,
): string => {
  switch (filterValue) {
    case "js": {
      if (initialRoute.startsWith("/sdk")) {
        return "lib/q/platform/js";
      }
      break;
    }
    case "android":
    case "ios": {
      if (initialRoute.startsWith("/lib")) {
        return `/sdk/q/platform/${filterValue}`;
      }
      break;
    }
  }

  return `${initialRoute}/q/${filterKey}/${filterValue}`;
};

@Component({tag: "docs-choose-anchor", shadow: false})
export class DocsChooseAnchor {
  /*** the current page's data */
  @Prop() readonly page?: Page;

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
                  <amplify-card key={label} vertical url={route}>
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
