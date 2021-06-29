import {MenuOpenButtonStyle} from "./styles";
import React from "react";
import {DESKTOP_OPEN} from "../../../constants/img";

type OpenButtonProps = {
  openMenu: () => void;
};
type OpenButtonState = {
  isHovered: boolean;
};
export default class MenuOpenButton extends React.Component<
  OpenButtonProps,
  OpenButtonState
> {
  constructor(props) {
    super(props);
    this.state = {isHovered: false};
  }

  hover = () => {
    this.setState({isHovered: true});
  };

  unhover = () => {
    this.setState({isHovered: false});
  };

  onClick = () => {
    this.props.openMenu();
  };

  render() {
    const imgLink = this.state.isHovered
      ? DESKTOP_OPEN.darkSrc
      : DESKTOP_OPEN.lightSrc;
    return (
      <MenuOpenButtonStyle
        onClick={this.onClick}
        onMouseEnter={this.hover}
        onMouseLeave={this.unhover}
      >
        <img alt={DESKTOP_OPEN.alt} src={imgLink} />
      </MenuOpenButtonStyle>
    );
  }
}
