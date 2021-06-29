import {MenuCloseButtonStyle} from "./styles";
import React from "react";
import {DESKTOP_CLOSE} from "../../../constants/img";

type CloseButtonProps = {
  closeMenu: () => void;
};
type CloseButtonState = {
  isHovered: boolean;
};
export default class MenuCloseButton extends React.Component<
  CloseButtonProps,
  CloseButtonState
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
    this.props.closeMenu();
  };

  render() {
    const imgLink = this.state.isHovered
      ? DESKTOP_CLOSE.darkSrc
      : DESKTOP_CLOSE.lightSrc;
    return (
      <MenuCloseButtonStyle
        onClick={this.onClick}
        onMouseEnter={this.hover}
        onMouseLeave={this.unhover}
      >
        <img alt={DESKTOP_CLOSE.alt} src={imgLink} />
      </MenuCloseButtonStyle>
    );
  }
}
