import React, {useCallback} from "react";
import {observer, Observer} from "mobx-react-lite";
import get from "lodash/get";
import getJourneyId from "../../helpers/getJourneyId";
import styled from "styled-components";
import {Text, text} from "../../helpers/text";
import SidepanelList from "./SidepanelList";
import {createRouteId} from "../../helpers/keys";
import {ColoredBackgroundSlot} from "../TagButton";
import getDelayType from "../../helpers/getDelayType";
import {getTimelinessColor} from "../../helpers/timelinessColor";
import {expr} from "mobx-utils";
import {getNormalTime, timeToSeconds, secondsToTime} from "../../helpers/time";
import Tooltip from "../Tooltip";
import {applyTooltip} from "../../hooks/useTooltip";
import flow from "lodash/flow";
import withRoute from "../../hoc/withRoute";
import {inject} from "../../helpers/inject";
import JourneysByDateQuery from "../../queries/RouteJourneysQuery";
import {createCompositeJourney} from "../../stores/journeyActions";

const JourneyListRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${({selected = false}) => (selected ? "var(--blue)" : "transparent")};
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
      selected ? "var(--blue)" : "rgba(0, 0, 0, 0.03)"};
  }
`;

const JourneyRowLeft = styled.span`
  display: block;
  font-weight: bold;
  min-width: 9.25rem;
  text-align: left;
`;

const DelaySlot = styled(ColoredBackgroundSlot)`
  font-size: 0.875rem;
  margin: -2.5px auto -2.5px 0;
  transform: none;
  padding: 5px;
  line-height: 1;
`;

const TimeSlot = styled.span`
  font-size: 0.857rem;
  font-family: "Courier New", Courier, monospace;
  min-width: 4.5rem;
  text-align: right;
`;

const JourneyInstanceDisplay = styled.span`
  margin-left: 0.5rem;
  padding: 2px 4px;
  border-radius: 2px;
  background: var(--lighter-grey);
  min-width: 1.5rem;
  text-align: center;
  display: inline-block;
  color: var(--dark-grey);
`;

const decorate = flow(
  observer,
  inject("Journey", "Filters", "Time")
);

const Journeys = decorate(({state, Time, Journey}) => {
  const selectJourney = useCallback((journeyOrTime, instance = 0) => {
    let journeyToSelect = null;

    if (journeyOrTime) {
      const journey =
        typeof journeyOrTime === "string"
          ? Journey.createCompositeJourney(
              state.date,
              state.route,
              journeyOrTime,
              instance
            )
          : journeyOrTime;

      const journeyId = getJourneyId(journey);

      // Only set these if the journey is truthy and was not already selected
      if (journeyId && getJourneyId(state.selectedJourney) !== journeyId) {
        Time.setTime(journey.journey_start_time);
        journeyToSelect = journey;
      }
    }

    Journey.setSelectedJourney(journeyToSelect, instance);
  }, []);

  const {date, route} = state;

  const selectedJourneyId = getJourneyId(state.selectedJourney);

  let focusedJourney = expr(() => {
    // Make sure that the selected journey belongs to the currently selected route.
    if (
      selectedJourneyId &&
      state.selectedJourney &&
      createRouteId(state.selectedJourney) === createRouteId(route)
    ) {
      return selectedJourneyId;
    }

    return null;
  });

  return (
    <JourneysByDateQuery route={route} date={date}>
      {({departures, loading}) => (
        <Observer>
          {() => {
            focusedJourney = expr(() => {
              if (focusedJourney) {
                return focusedJourney;
              }

              const time = timeToSeconds(state.time);
              let closestDeparture = null;
              let prevDiff = -1;

              for (const departure of departures) {
                const departureTime = get(
                  departure,
                  "plannedDepartureTime.departureTime",
                  ""
                );

                if (!departureTime) {
                  continue;
                }

                const departureTimeNum = timeToSeconds(departureTime);
                const diff = Math.abs(departureTimeNum - time);

                if (prevDiff === -1 || diff < prevDiff) {
                  prevDiff = diff;
                  closestDeparture = departure;
                }
              }

              return closestDeparture ? get(closestDeparture, "id", null) : null;
            });

            return (
              <SidepanelList
                reset={!focusedJourney || departures.length === 0}
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
                {(scrollRef) =>
                  departures.map((departure) => {
                    const departureDate = departure.plannedDepartureTime.departureDate;
                    const departureTime = departure.plannedDepartureTime.departureTime;

                    if (!departure.journey) {
                      const compositeJourney = createCompositeJourney(
                        departureDate,
                        departure,
                        departureTime
                      );

                      const journeyId = getJourneyId(compositeJourney);

                      const journeyIsSelected = expr(
                        () =>
                          state.selectedJourney &&
                          selectedJourneyId.slice(0, -1) === journeyId
                      );

                      const journeyIsFocused =
                        focusedJourney && focusedJourney.slice(0, -1) === journeyId;

                      return (
                        <JourneyListRow
                          ref={journeyIsFocused ? scrollRef : null}
                          key={`planned_journey_row_${journeyId}`}
                          selected={journeyIsSelected}
                          onClick={selectJourney(departureTime)}>
                          <Tooltip helpText="Planned journey time">
                            <JourneyRowLeft>
                              {getNormalTime(departureTime)}
                            </JourneyRowLeft>
                          </Tooltip>
                          <Tooltip helpText="Journey no data">
                            <span>{text("filterpanel.journey.no_data")}</span>
                          </Tooltip>
                        </JourneyListRow>
                      );
                    }

                    const journeyId = getJourneyId(departure.journey);

                    const journeyIsSelected = expr(
                      () => selectedJourneyId && selectedJourneyId === journeyId
                    );

                    const plannedObservedDiff =
                      departure.observedDepartureTime.departureTimeDifference;

                    const observedTimeString =
                      departure.observedDepartureTime.departureTime;

                    const diffTime = secondsToTime(plannedObservedDiff);
                    const delayType = getDelayType(plannedObservedDiff);
                    const instance = departure.journey.instance;

                    const observedJourney = (
                      <>
                        <Tooltip helpText="Journey list diff">
                          <DelaySlot
                            adjustLeft={instance > 0} // Adjust the layout slightly if we have an instance indicator.
                            color={delayType === "late" ? "var(--dark-grey)" : "white"}
                            backgroundColor={getTimelinessColor(
                              delayType,
                              "var(--light-green)"
                            )}>
                            {plannedObservedDiff < 0 ? "-" : ""}
                            {diffTime}
                          </DelaySlot>
                        </Tooltip>
                        <Tooltip helpText="Journey list observed">
                          <TimeSlot>{observedTimeString}</TimeSlot>
                        </Tooltip>
                      </>
                    );

                    // The focused journey is used for scrolling and comparing
                    // instances is problematic, so strip the instance char
                    // from both sides of the comparison.
                    const journeyIsFocused =
                      focusedJourney &&
                      focusedJourney.slice(0, -1) === journeyId.slice(0, -1);

                    return (
                      <JourneyListRow
                        {...applyTooltip("Journey list row")}
                        ref={journeyIsFocused ? scrollRef : null}
                        selected={journeyIsSelected}
                        key={`journey_row_${journeyId}_${instance}`}
                        onClick={selectJourney(departure.journey, instance)}>
                        <JourneyRowLeft
                          {...applyTooltip("Planned journey time with data")}>
                          {getNormalTime(observedTimeString)}
                          {instance > 0 && (
                            <JourneyInstanceDisplay {...applyTooltip("Journey instance")}>
                              {instance + 1}
                            </JourneyInstanceDisplay>
                          )}
                        </JourneyRowLeft>
                        {observedJourney}
                      </JourneyListRow>
                    );
                  })
                }
              </SidepanelList>
            );
          }}
        </Observer>
      )}
    </JourneysByDateQuery>
  );
});

export default Journeys;
