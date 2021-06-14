import React, {useEffect} from "react";
import {useCodeBlockContext} from "../CodeBlockProvider";
import {
  ActiveTabStyle,
  BlockShowStyle,
  HostStyle,
  TabContainerStyle,
  TabStyle,
} from "./styles";

type ContextType = {
  tabOrder: string[];
  setActiveTab: (_: any) => void;
};

type SwitcherButtonProps = {
  name: string;
  isActive: boolean;
  ctx: ContextType;
};

class SwitcherButton extends React.Component<SwitcherButtonProps> {
  constructor(props) {
    super(props);
    // Following `react/jsx-no-bind` linter rule
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.ctx.setActiveTab(this.props.name);
  }

  render() {
    const Style = this.props.isActive ? ActiveTabStyle : TabStyle;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return <Style onClick={this._onClick}>{this.props.name}</Style>;
  }
}

const getActiveIndex = function(
  children: React.ReactElement[],
  tabOrder: string[],
) {
  // The index we want to be active is the first one in priority order (`ctx.tabOrder`)
  // that is also one of the options (i.e., in `children`).
  const nameToIndexMap = {};
  children.forEach((node, index) => {
    nameToIndexMap[node.props.name] = index;
  });
  for (const tabName of tabOrder) {
    if (tabName in nameToIndexMap) {
      return nameToIndexMap[tabName];
    }
  }
};

export default function BlockSwitcher({children}) {
  const ctx = useCodeBlockContext();
  console.log(ctx.tabOrder);
  useEffect(() => {
    // If we haven't seen these tab names before, just add the first one as top priority.
    if (!ctx.tabOrder.includes(children[0].props.name)) {
      ctx.setActiveTab(children[0].props.name);
    }
  });
  const activeIndex = getActiveIndex(children, ctx.tabOrder);

  return (
    <HostStyle>
      <TabContainerStyle>
        {children?.map((node, index) => {
          return (
            <SwitcherButton
              name={node.props.name}
              key={index}
              isActive={index === activeIndex}
              ctx={ctx}
            />
          );
        })}
      </TabContainerStyle>
      <BlockShowStyle index={activeIndex}>{children}</BlockShowStyle>
    </HostStyle>
  );
}
