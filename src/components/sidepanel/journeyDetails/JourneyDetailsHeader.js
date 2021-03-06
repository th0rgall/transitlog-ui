import {Heading} from "../../Typography";
import {TransportIcon} from "../../transportModes";
import React from "react";
import styled from "styled-components";
import Calendar from "../../../icons/Calendar";
import JourneyPlanner from "../../../icons/JourneyPlanner";
import Time2 from "../../../icons/Time2";
import get from "lodash/get";
import {WeatherWidget} from "../../map/WeatherDisplay";
import {useJourneyWeather} from "../../../hooks/useJourneyWeather";
import {useWeatherData} from "../../../hooks/useWeatherData";
import getJourneyId from "../../../helpers/getJourneyId";
import {observer} from "mobx-react-lite";
import {useDebouncedValue} from "../../../hooks/useDebouncedValue";
import {parseLineNumber} from "../../../helpers/parseLineNumber";

const JourneyPanelHeader = styled.div`
  flex: none;
  padding: 1rem;
  border-bottom: 1px solid var(--lighter-grey);
  width: 100%;

  > * {
    display: flex;
    align-items: flex-end;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  svg {
    margin-left: -0.2rem;
    margin-right: 0.5rem;
  }
`;

const LineIdHeading = styled.span`
  font-weight: bold;
  margin: 0;
`;

const LineNameHeading = styled(Heading).attrs({level: 4})`
  font-weight: normal;
  margin: 0;
`;

const MainHeaderRow = styled(Heading).attrs({level: 3})`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
`;

const HeaderText = styled.span`
  font-weight: normal;
  margin-left: 1.25rem;
  display: inline-flex;
  align-items: flex-start;
  font-size: 0.875rem;
  padding-bottom: 0.2rem;
  overflow: visible;

  &:first-child {
    margin-left: 0;
  }

  svg {
    margin-left: 0;
  }
`;

const WeatherDisplay = styled(WeatherWidget)`
  position: static;
  padding: 0;
  border: 0;
  background: transparent;
  margin-left: auto;
  font-size: 0.75rem;
  text-align: right;
  max-height: 1.2rem;
`;

const DateTimeHeading = styled.div`
  margin-bottom: 0.75rem;
`;

export default observer(({date, journey, currentTime}) => {
  const [currentJourneyWeather] = useJourneyWeather(
    journey.events,
    getJourneyId(journey)
  );
  const debouncedTime = useDebouncedValue(currentTime.valueOf(), 1000);
  const journeyWeather = useWeatherData(currentJourneyWeather, debouncedTime);

  const {mode, routeId, direction, uniqueVehicleId, departureTime, name} = journey;
  const routeNameParts = name.split(" - ");

  if (direction === 2) {
    routeNameParts.reverse();
  }

  const routeName = routeNameParts.join(" - ");

  return (
    <JourneyPanelHeader>
      <MainHeaderRow>
        <TransportIcon width={23} height={23} mode={mode} />
        <LineIdHeading>{parseLineNumber(get(journey, "lineId", ""))}</LineIdHeading>
        <HeaderText>
          <JourneyPlanner fill="var(--blue)" width="1rem" height="1rem" />
          {routeId}
        </HeaderText>
        <HeaderText>
          <TransportIcon mode={mode} width={17} height={17} />
          {uniqueVehicleId}
        </HeaderText>
        <WeatherDisplay {...journeyWeather || {}} />
      </MainHeaderRow>
      <DateTimeHeading>
        <HeaderText>
          <Calendar fill="var(--blue)" width="1rem" height="1rem" />
          {date}
        </HeaderText>
        <HeaderText>
          <Time2 fill="var(--blue)" width="1rem" height="1rem" />
          {departureTime}
        </HeaderText>
      </DateTimeHeading>
      <LineNameHeading>{routeName}</LineNameHeading>
    </JourneyPanelHeader>
  );
});
