import React from "react";
import {useAppContext} from "../Layout";
import {
  ActiveTabStyle,
  BlockShowStyle,
  HostStyle,
  TabContainerStyle,
  TabStyle,
} from "./styles";

type SwitcherButtonProps = {
  name: string;
  index: number;
  obj: any;
};

class SwitcherButton extends React.Component<SwitcherButtonProps> {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.obj.setActiveTab(this.props.index);
  }

  render() {
    const Style =
      this.props.obj.activeTab === this.props.index ? ActiveTabStyle : TabStyle;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return <Style onClick={this._onClick}>{this.props.name}</Style>;
  }
}

export default function BlockSwitcher({children}) {
  const obj = useAppContext();
  return (
    <HostStyle>
      <TabContainerStyle>
        {children?.map((e, i) => {
          return (
            <SwitcherButton name={e.props.name} key={i} index={i} obj={obj} />
          );
        })}
      </TabContainerStyle>
      <BlockShowStyle index={obj.activeTab}>{children}</BlockShowStyle>
    </HostStyle>
  );
}
