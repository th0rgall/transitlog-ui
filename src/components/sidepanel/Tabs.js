import React, {Component, Children} from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import compact from "lodash/compact";
import {setUrlValue, getUrlValue} from "../../stores/UrlManager";

const TabsWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const TabButtonsWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
`;

const TabButton = styled.button`
  font-family: inherit;
  font-size: 0.875rem;
  text-transform: uppercase;
  background-color: ${({selected}) => (selected ? "white" : "var(--lightest-grey)")};
  border: 1px solid var(--alt-grey);
  border-left: 0;
  border-bottom-color: ${({selected}) =>
    selected ? "transparent" : "var(--lighter-grey)"};
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: 0;
  padding: 1rem 0.5rem;

  &:last-child {
    border-right: 0;
  }

  &:only-child {
    padding-bottom: 0.5rem;
  }
`;

const TabContentWrapper = styled.div`
  background: white;
  height: 100%;
`;

let selectedTab = "";

@observer
class Tabs extends Component {
  state = {
    selectedTab: getUrlValue("tab"),
  };

  onTabClick = (selectName) => () => {
    this.setState(
      {
        selectedTab: selectName,
      },
      () => {
        setUrlValue("tab", this.state.selectedTab);
      }
    );
  };

  render() {
    const {children, className} = this.props;
    selectedTab = this.state.selectedTab || selectedTab; // Ensure that "transient" values stay between renders

    // The tab content to render
    let selectedTabContent = null;

    // The children usually contain an empty string as the first element.
    // Compact() removes all falsy values from the array.
    const validChildren = compact(Children.toArray(children));

    const tabs = validChildren.map((tabContent, idx, allChildren) => {
      if (!tabContent || !React.isValidElement(tabContent)) {
        return null;
      }

      const {name, label} = tabContent.props;

      // If there is only one tab, select it right off. Or, if there
      // is no tab selected, autoselect the first tab.
      if (
        (allChildren.length === 1 && selectedTab !== name) ||
        (!selectedTab && idx === 0)
      ) {
        selectedTab = name;
      }

      // Set the current tab content to the selected tab
      if (name === selectedTab) {
        selectedTabContent = tabContent;
      }

      return {name, label};
    });

    // The selected tab might not be available, so pick the first tab in that case.
    if (
      tabs.length !== 0 &&
      tabs.findIndex((tab) => tab.name === selectedTab) === -1
    ) {
      selectedTab = tabs[0].name;
    }

    return (
      <TabsWrapper className={className}>
        <TabButtonsWrapper>
          {compact(tabs).map((tabOption, index) => (
            <TabButton
              key={`tab_${tabOption.name}_${index}`}
              selected={selectedTab === tabOption.name}
              onClick={this.onTabClick(tabOption.name)}>
              {tabOption.label}
            </TabButton>
          ))}
        </TabButtonsWrapper>
        <TabContentWrapper>{selectedTabContent}</TabContentWrapper>
      </TabsWrapper>
    );
  }
}

export default Tabs;
