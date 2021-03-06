import {action} from "mobx";
import {setUrlValue} from "./UrlManager";
import debounce from "lodash/debounce";
import doubleDigit from "../helpers/doubleDigit";
import {secondsToTimeObject} from "../helpers/time";

const timeActions = (state) => {
  // Time might update frequently, so make sure that setting it
  // in the url doesn't slow down the app.
  const setUrlTime = debounce((time) => setUrlValue("time", time), 1000);

  const setTime = action((timeValue) => {
    state.time = timeValue;
    setUrlTime(state.time);
  });

  const setSeconds = (setValue = 0) => {
    const {hours, minutes, seconds} = secondsToTimeObject(setValue);
    setTime(`${doubleDigit(hours)}:${doubleDigit(minutes)}:${doubleDigit(seconds)}`);
  };

  const setTimeIncrement = action((timeIncrementValue) => {
    state.timeIncrement = parseInt(timeIncrementValue, 10);
    setUrlValue("time_increment", state.timeIncrement);
  });

  const setAreaSearchMinutes = action((searchValue) => {
    state.areaSearchRangeMinutes = parseInt(searchValue, 10);
    setUrlValue("area_search_minutes", state.areaSearchRangeMinutes);
  });

  const toggleLive = action((setTo = !state.live) => {
    state.live = setTo;
    setUrlValue("live", state.live);
  });

  return {
    setTime,
    setSeconds,
    setTimeIncrement,
    setAreaSearchMinutes,
    toggleLive,
  };
};

export default timeActions;
