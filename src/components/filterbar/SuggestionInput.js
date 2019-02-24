import React, {Component} from "react";
import Autosuggest from "react-autosuggest";
import autosuggestStyles from "./SuggestionInput.css";
import {observer} from "mobx-react";
import styled from "styled-components";
import {InputStyles} from "../Forms";
import {observable, action} from "mobx";
import Tooltip from "../Tooltip";

const AutosuggestWrapper = styled.div`
  width: 100%;
  ${autosuggestStyles};

  .react-autosuggest__input {
    ${InputStyles};
  }
`;

export const SuggestionContent = styled.div`
  display: flex;
  align-items: center;
  background: ${({isHighlighted = false}) =>
      isHighlighted ? "var(--light-blue)" : "transparent"}
    no-repeat;
  color: ${({isHighlighted = false}) =>
    isHighlighted ? "white" : "var(--dark-grey)"};
  padding: 0.25rem 0.5rem;

  ${({withIcon = false}) =>
    withIcon
      ? `
&:before {
    content: "";
    width: 1.25rem;
    height: 1.25rem;
  }
`
      : ""};
`;

export const SuggestionText = styled.div`
  font-family: var(--font-family);
  line-height: 1.3;
  margin-left: ${({withIcon = false}) => (withIcon ? "0.5rem" : "0")};
`;

export const SuggestionSectionTitle = styled.div`
  font-weight: bold;
  margin: 0.5rem 0;
  padding: 0.25rem;
`;

@observer
class SuggestionInput extends Component {
  @observable
  inputValue = this.props.getValue(this.props.value);

  @observable
  suggestions = [];

  @action
  setValue(value) {
    this.inputValue = value;
  }

  @action
  setSuggestions(suggestions) {
    this.suggestions = suggestions;
  }

  onChange = (event, {newValue}) => {
    const value = newValue;
    const {getValue} = this.props;

    if (!value) {
      this.props.onSelect("");
    }

    this.setValue(getValue(value));
  };

  onSuggestionSelected = (event, {suggestion}) => {
    const selectedValue = this.props.getValue(suggestion);
    this.props.onSelect(selectedValue);
    this.setValue(selectedValue);
  };

  onSuggestionsFetchRequested = ({value}) => {
    const {getSuggestions} = this.props;
    this.setSuggestions(getSuggestions(value) || []);
  };

  onSuggestionsClearRequested = () => {
    this.setSuggestions([]);
  };

  shouldRenderSuggestions = (limit) => (value) => {
    return value.trim().length >= limit;
  };

  componentDidUpdate({value: prevValue}) {
    const {value, getValue} = this.props;

    if (value !== prevValue) {
      const nextValue = getValue(value);
      this.setValue(nextValue);
    }
  }

  render() {
    const {
      className,
      placeholder,
      getValue,
      renderSuggestion,
      minimumInput = 3,
      multiSection,
      renderSectionTitle,
      getSectionSuggestions,
      helpText = "",
    } = this.props;

    const inputProps = {
      placeholder,
      value: this.inputValue,
      onChange: this.onChange,
    };

    return (
      <Tooltip helpText={helpText}>
        <AutosuggestWrapper className={className}>
          <Autosuggest
            suggestions={this.suggestions}
            shouldRenderSuggestions={this.shouldRenderSuggestions(minimumInput)}
            onSuggestionSelected={this.onSuggestionSelected}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getValue}
            highlightFirstSuggestion={true}
            multiSection={multiSection}
            renderSectionTitle={renderSectionTitle}
            getSectionSuggestions={getSectionSuggestions}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </AutosuggestWrapper>
      </Tooltip>
    );
  }
}

export default SuggestionInput;
