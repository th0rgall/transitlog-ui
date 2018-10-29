import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import map from "lodash/map";
import get from "lodash/get";
import sortBy from "lodash/sortBy";
import {app} from "mobx-app";
import getJourneyId from "../../helpers/getJourneyId";
import styled from "styled-components";
import {timeToFormat} from "../../helpers/time";
import {Text, text} from "../../helpers/text";
import withDepartures from "../../hoc/withRouteStopDepartures";
import doubleDigit from "../../helpers/doubleDigit";
import {observable, action, toJS} from "mobx";
import Loading from "../Loading";
import SidepanelList from "./SidepanelList";
import {journeyFetchStates} from "../../stores/JourneyStore";
import {createFetchKey} from "../../helpers/keys";
import {centerSort} from "../../helpers/centerSort";
import {departuresToTimes} from "../../helpers/departuresToTimes";
import {findJourneyStartPosition} from "../../helpers/findJourneyStartPosition";
import JourneyPosition from "../map/JourneyPosition";

const JourneyListRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${({selected = false}) =>
    selected ? "var(--blue)" : "rgba(0, 0, 0, 0.025)"};
  padding: 0.75rem 1rem;
  border: 0;
  max-width: none;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  color: ${({selected = false}) => (selected ? "white" : "var(--grey)")};
  outline: none;

  &:nth-child(odd) {
    background: ${({selected = false}) =>
      selected ? "var(--blue)" : "rgba(255, 255, 255, 0.025)"};
  }
`;

const JourneyRowLeft = styled.span`
  margin-right: 1rem;
  display: block;
  font-weight: bold;
`;

@inject(app("Journey", "Time", "Filters"))
@withDepartures
@observer
class Journeys extends Component {
  @observable
  selectedJourneyOffset = 0;
  selectedJourneyRef = React.createRef();
  clickedJourneyItem = false;
  currentFetchKey = "";

  componentDidUpdate({positions: prevPositions}, prevState) {
    this.fetchAllJourneys();

    const {selectedJourney} = this.props.state;
    const {loading} = this.props;

    if (!this.clickedJourneyItem && selectedJourney && !loading) {
      this.setSelectedJourneyOffset();
    }
  }

  fetchAllJourneys = () => {
    const {
      Journey,
      departures,
      state: {date, route, time, selectedJourney},
    } = this.props;

    // Create fetchKey key without time
    const fetchKey = createFetchKey(route, date, false, true);

    if (fetchKey !== this.currentFetchKey) {
      // Format to an array of string times, like 12:30:00
      let fetchTimes = departuresToTimes(departures);

      if (fetchTimes.length !== 0) {
        // Find which time we want to fetch first.
        let firstTime = selectedJourney ? selectedJourney.journey_start_time : time;
        fetchTimes = centerSort(firstTime, fetchTimes).slice(0, 11);

        const journeyRequests = fetchTimes.map((time) => ({
          time,
          route: toJS(route),
          date,
        }));

        Journey.requestJourneys(journeyRequests);
        this.currentFetchKey = fetchKey;
      }
    }
  };

  selectJourney = (journeyOrTime) => (e) => {
    e.preventDefault();
    const {departures, Time, Journey, state} = this.props;
    let journeyToSelect = null;

    if (journeyOrTime) {
      const journey =
        typeof journeyOrTime === "string"
          ? Journey.getJourneyFromStateAndTime(journeyOrTime)
          : journeyOrTime;

      const journeyId = getJourneyId(journey);

      // Only set these if the journey is truthy and was not already selected
      if (journeyId && getJourneyId(state.selectedJourney) !== journeyId) {
        Time.setTime(
          timeToFormat(
            journey.journey_start_timestamp,
            "HH:mm:ss",
            "Europe/Helsinki"
          )
        );

        journeyToSelect = journey;

        const fetchTimes = centerSort(
          journey.journey_start_time,
          departuresToTimes(departures)
        ).slice(0, 6);

        const journeyRequests = fetchTimes.map((time) => ({
          time,
          route: {routeId: journey.route_id, direction: journey.direction_id},
          date: journey.oday,
        }));

        if (fetchTimes.length !== 0) {
          Journey.requestJourneys(journeyRequests);
        }
      }
    }

    this.clickedJourneyItem = true;
    Journey.setSelectedJourney(journeyToSelect);
  };

  getJourneyStartPosition(journeyId) {
    const {positions} = this.props;
  }

  setSelectedJourneyOffset = action(() => {
    if (this.selectedJourneyRef.current) {
      let offset = get(this.selectedJourneyRef, "current.offsetTop", null);

      if (offset && offset !== this.selectedJourneyOffset) {
        this.selectedJourneyOffset = offset;
      }
    }
  });

  render() {
    const {positions, loading, state, departures, Journey} = this.props;
    const {selectedJourney, resolvedJourneyStates} = state;

    const journeys = map(positions, ({positions}) => positions[0]);
    const selectedJourneyId = getJourneyId(selectedJourney);

    const isSelected = (journey) =>
      selectedJourney && selectedJourneyId === getJourneyId(journey);

    const plannedDepartures = departures.reduce((planned, departure) => {
      const timeStr = `${doubleDigit(departure.hours)}:${doubleDigit(
        departure.minutes
      )}:00`;

      if (journeys.some((j) => j.journey_start_time === timeStr)) {
        return planned;
      }

      planned.push(timeStr);
      return planned;
    }, []);

    const departureList = sortBy([...journeys, ...plannedDepartures], (value) => {
      if (typeof value === "string") {
        return value;
      }

      return get(value, "journey_start_time", 0);
    });

    return (
      <SidepanelList
        scrollOffset={this.selectedJourneyOffset}
        loading={loading}
        header={
          <>
            <JourneyRowLeft>
              <Text>filterpanel.planned_start_time</Text>
            </JourneyRowLeft>
            <span>
              <Text>filterpanel.real_start_time</Text>
            </span>
          </>
        }>
        {departureList.map((journeyOrDeparture, index) => {
          if (typeof journeyOrDeparture === "string") {
            const journeyId = getJourneyId(
              Journey.getJourneyFromStateAndTime(journeyOrDeparture)
            );

            const journeyIsSelected =
              selectedJourney && selectedJourneyId === journeyId;

            let fetchStatus = resolvedJourneyStates.get(journeyId);

            return (
              <JourneyListRow
                ref={journeyIsSelected ? this.selectedJourneyRef : null}
                key={`planned_journey_row_${journeyOrDeparture}_${index}`}
                selected={journeyIsSelected}
                onClick={this.selectJourney(journeyOrDeparture)}>
                <JourneyRowLeft>{journeyOrDeparture}</JourneyRowLeft>
                {fetchStatus === journeyFetchStates.NOTFOUND ? (
                  <span>{text("filterpanel.journey.unrealized")}</span>
                ) : fetchStatus === journeyFetchStates.PENDING ? (
                  <Loading inline />
                ) : (
                  <span>{text("filterpanel.journey.click_to_fetch")}</span>
                )}
              </JourneyListRow>
            );
          }

          const journeyId = getJourneyId(journeyOrDeparture);

          const journeyPositions = get(
            positions.find(({journeyId: jid}) => jid === journeyId),
            "positions",
            []
          );

          const journeyStartPosition = findJourneyStartPosition(
            journeyId,
            journeyPositions
          );

          const journeyIsSelected = isSelected(journeyOrDeparture);

          return (
            <JourneyListRow
              ref={journeyIsSelected ? this.selectedJourneyRef : null}
              selected={journeyIsSelected}
              key={`journey_row_${getJourneyId(journeyOrDeparture)}`}
              onClick={this.selectJourney(journeyOrDeparture)}>
              <JourneyRowLeft>
                {timeToFormat(
                  journeyOrDeparture.journey_start_timestamp,
                  "HH:mm:ss",
                  "Europe/Helsinki"
                )}
              </JourneyRowLeft>
              {journeyStartPosition && (
                <span>
                  {timeToFormat(
                    journeyStartPosition.received_at,
                    "HH:mm:ss",
                    "Europe/Helsinki"
                  )}
                </span>
              )}
            </JourneyListRow>
          );
        })}
      </SidepanelList>
    );
  }
}

export default Journeys;
