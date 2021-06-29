import Link from "next/link";
import Image from "next/image";
import {platformFilterMetadataByOption} from "../../utils/filter-data";
import {
  PlatformSelectStyle,
  CurrentlySelectedStyle,
  DropdownStyle,
} from "./styles";
import React from "react";

type PlatformSelectProps = {
  filters: string[];
  platform: string;
  pathname: string;
};

class PlatformSelect extends React.Component<PlatformSelectProps> {
  visible = false;
  wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.closeMenu = this.closeMenu.bind(this);
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
      this.visible
    ) {
      this.visible = false;
      this.forceUpdate();
    }
  };

  toggleVis = () => {
    this.visible = !this.visible;
    this.forceUpdate();
  };

  render() {
    return (
      <PlatformSelectStyle ref={this.wrapperRef}>
        <CurrentlySelectedStyle>
          <a onClick={this.toggleVis}>
            <Image
              src={
                platformFilterMetadataByOption[this.props.platform].graphicURI
              }
              height="20px"
              width="20px"
            />
            {platformFilterMetadataByOption[this.props.platform].label}
          </a>
        </CurrentlySelectedStyle>
        <DropdownStyle shouldDisplay={this.visible}>
          {this.props.filters.map((name) => {
            if (name === this.props.platform) return;
            return (
              <Link
                href={{
                  pathname: this.props.pathname,
                  query: {platform: name},
                }}
                key={name}
              >
                <a>
                  <Image
                    src={platformFilterMetadataByOption[name].graphicURI}
                    height="20px"
                    width="20px"
                  />
                  {platformFilterMetadataByOption[name].label}
                </a>
              </Link>
            );
          })}
        </DropdownStyle>
      </PlatformSelectStyle>
    );
  }
}

export default function Menu({
  filters,
  platform,
  pathname,
}: PlatformSelectProps) {
  return (
    <PlatformSelect filters={filters} platform={platform} pathname={pathname} />
  );
}
