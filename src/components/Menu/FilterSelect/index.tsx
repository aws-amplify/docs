import Link from "next/link";
import {filterMetadataByOption} from "../../../utils/filter-data";
import {
  FilterSelectStyle,
  CurrentlySelectedStyle,
  DropdownStyle,
} from "./styles";
import React from "react";
import {NextRouter, withRouter} from "next/router";

type FilterSelectProps = {
  filters: string[];
  filterKey: string;
  pathname: string;
  router: NextRouter;
};

type FilterSelectState = {
  isOpen: boolean;
};

class FilterSelect extends React.Component<
  FilterSelectProps,
  FilterSelectState
> {
  wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {isOpen: false};
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.closeMenu);
  }

  closeMenu = (event: MouseEvent) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target as Node) &&
      this.state.isOpen
    ) {
      this.setState({
        isOpen: false,
      });
    }
  };

  toggleVis = () => {
    this.setState((oldState) => {
      return {isOpen: !oldState.isOpen};
    });
  };

  render() {
    let filterKind = "";
    if ("platform" in this.props.router.query) {
      filterKind = "platform";
    } else if ("integration" in this.props.router.query) {
      filterKind = "integration";
    } else {
      filterKind = "framework";
    }

    return (
      <FilterSelectStyle ref={this.wrapperRef}>
        {filterMetadataByOption[this.props.filterKey] && (
          <CurrentlySelectedStyle>
            <a onClick={this.toggleVis}>
              <img
                src={filterMetadataByOption[this.props.filterKey]?.graphicURI}
                height="28px"
                width="28px"
              />
              <span>{filterMetadataByOption[this.props.filterKey]?.label}</span>
            </a>
          </CurrentlySelectedStyle>
        )}
        <DropdownStyle shouldDisplay={this.state.isOpen}>
          {this.props.filters.map((name) => {
            if (name === this.props.filterKey) return;
            const query = {};
            query[filterKind] = name;
            return (
              <Link
                href={{
                  pathname: this.props.pathname,
                  query: query,
                }}
                key={name}
              >
                <a onClick={this.toggleVis}>
                  <img
                    src={filterMetadataByOption[name]?.graphicURI}
                    height="28px"
                    width="28px"
                  />
                  <span>{filterMetadataByOption[name]?.label}</span>
                </a>
              </Link>
            );
          })}
        </DropdownStyle>
      </FilterSelectStyle>
    );
  }
}

export default withRouter(FilterSelect);
