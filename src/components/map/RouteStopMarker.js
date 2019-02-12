import React from "react";
import {Marker, CircleMarker, Tooltip, Popup} from "react-leaflet";
import {icon, latLng} from "leaflet";
import TimingStopIcon from "../../icon-time1.svg";
import {observer, inject} from "mobx-react";
import {P} from "../Typography";
import {
  ColoredBackgroundSlot,
  PlainSlot,
  PlainSlotSmall,
  TagButton,
} from "../TagButton";
import styled from "styled-components";
import {getPriorityMode, getModeColor} from "../../helpers/vehicleColor";
import get from "lodash/get";
import {StopRadius} from "./StopRadius";
import {
  journeyEventTime,
  getNormalTime,
  timeToSeconds,
  secondsToTime,
  secondsToTimeObject,
} from "../../helpers/time";
import {Text} from "../../helpers/text";
import {app} from "mobx-app";
import {getTimelinessColor} from "../../helpers/timelinessColor";
import doubleDigit from "../../helpers/doubleDigit";
import {
  TimeHeading,
  StopHeading,
  StopContent,
  StopArrivalTime,
  SmallText,
} from "../StopElements";
import CalculateTerminalTime from "../sidepanel/journeyDetails/CalculateTerminalTime";

const PopupParagraph = styled(P)`
  font-family: var(--font-family);
  font-size: 1rem;
`;

const TooltipParagraph = styled(P)`
  font-family: var(--font-family);
  font-size: 0.875rem;
  margin: 0.5rem 0 -0.5rem;
`;

const PopupStopContent = styled(StopContent)`
  padding: 0 0 1rem;
  font-size: 1rem;
`;

const DepartureTimeGroup = styled.div`
  min-width: 300px;
`;

@inject(app("Filters", "Time"))
@observer
class RouteStopMarker extends React.Component {
  onClickTime = (time) => (e) => {
    e.preventDefault();
    this.props.Time.setTime(time);
  };

  onClickMarker = () => {
    const {stop, Filters} = this.props;
    Filters.setStop(stop.stopId);
  };

  createStopMarker = (
    delayType,
    color,
    isTerminal,
    children,
    doorDidOpen = true
  ) => {
    const {stop, showRadius, selected} = this.props;

    const timingStopIcon = icon({
      iconUrl: TimingStopIcon,
      iconSize: [30, 30],
      iconAnchor: [23, 25 / 2],
      popupAnchor: [3, -15],
      className: `stop-marker timing-stop ${delayType} ${
        !doorDidOpen ? "doors-not-opened" : ""
      }`,
    });

    const mode = getPriorityMode(get(stop, "modes.nodes", []));
    const stopColor = getModeColor(mode);

    const markerPosition = [stop.lat, stop.lon];

    const markerElement = React.createElement(
      stop.timingStopType ? Marker : CircleMarker,
      {
        pane: "stops",
        icon: stop.timingStopType ? timingStopIcon : null,
        center: markerPosition, // One marker type uses center...
        position: markerPosition, // ...the other uses position.
        color: color,
        dashArray: !doorDidOpen ? "3 5" : "",
        fillColor: selected ? stopColor : "white",
        fillOpacity: 1,
        strokeWeight: isTerminal ? 5 : 3,
        radius: isTerminal || selected ? 13 : 9,
        onClick: this.onClickMarker,
      },
      children
    );

    return showRadius ? (
      <StopRadius
        key={`stop_radius_${stop.stopId}${selected ? "_selected" : ""}`}
        isHighlighted={selected}
        center={markerPosition}
        radius={stop.stopRadius}
        color={stopColor}>
        {markerElement}
      </StopRadius>
    ) : (
      markerElement
    );
  };

  onShowStreetView = () => {
    const {onViewLocation, stop} = this.props;
    onViewLocation(latLng({lat: stop.lat, lng: stop.lon}));
  };

  render() {
    const {
      stop,
      date,
      firstStop,
      firstTerminal,
      lastTerminal,
      selectedJourney,
    } = this.props;

    const isTerminal = firstTerminal || lastTerminal;

    let stopTooltip = (
      <Tooltip key={`stop${stop.stopId}_tooltip`}>
        <StopHeading>
          <strong>{get(stop, "nameFi", "")}</strong> {get(stop, "stopId", "")} (
          {get(stop, "shortId", "").replace(/ /g, "")})
        </StopHeading>
      </Tooltip>
    );

    let stopStreetViewPopup = (
      <Popup
        minWidth={300}
        maxWidth={800}
        autoPan={true}
        key={`stop_${stop.stopId}_popup`}>
        <PopupStopContent>
          <StopHeading>
            <strong>{stop.nameFi}</strong> {stop.stopId} (
            {stop.shortId.replace(/ /g, "")})
          </StopHeading>
        </PopupStopContent>
        <button onClick={this.onShowStreetView}>Show in street view</button>
      </Popup>
    );

    let markerChildren = [stopTooltip, stopStreetViewPopup];

    const mode = getPriorityMode(get(stop, "modes.nodes", []));
    let color = getModeColor(mode);
    let delayType = "none";

    if (!selectedJourney || !stop.departure || !stop.departureEvent) {
      return this.createStopMarker(delayType, color, isTerminal, markerChildren);
    }

    const {
      departureEvent,
      plannedDepartureMoment,
      departureDelayType,
      departureDiff,
      plannedArrivalMoment,
      departureColor,
      arrivalEvent,
      arrivalDiff,
      doorDidOpen,
    } = stop;

    delayType = departureDelayType;
    color = departureColor;

    const stopDepartureTime = journeyEventTime(departureEvent);
    const stopArrivalTime = journeyEventTime(arrivalEvent);

    // Calculate the duration values

    let plannedDuration = 0;
    let observedDuration = 0;
    let durationDiff = 0;
    let durationDiffSign = "";

    const firstStopPlannedDepartureTime = get(
      firstStop,
      "plannedDepartureMoment",
      null
    );

    if (firstStopPlannedDepartureTime && plannedDepartureMoment) {
      plannedDuration = plannedDepartureMoment.diff(
        firstStopPlannedDepartureTime,
        "seconds"
      );
    }
    const firstStopDepartureTime = journeyEventTime(
      get(firstStop, "departureEvent", null)
    );

    const firstStopDepartureSeconds = timeToSeconds(firstStopDepartureTime);
    const stopDepartureSeconds = timeToSeconds(stopDepartureTime);

    if (firstStopDepartureSeconds && stopDepartureSeconds) {
      observedDuration = stopDepartureSeconds - firstStopDepartureSeconds;
    }

    if (plannedDuration > 0 && observedDuration > 0) {
      const durationDiffSeconds = observedDuration - plannedDuration;
      durationDiffSign = durationDiffSeconds < 0 ? "-" : "";
      durationDiff = secondsToTimeObject(durationDiffSeconds);
    }

    // Create the arrival/departure time elements

    const observedDepartureTime = (
      <TagButton onClick={this.onClickTime(stopDepartureTime)}>
        <PlainSlot>{plannedDepartureMoment.format("HH:mm:ss")}</PlainSlot>
        <ColoredBackgroundSlot
          color={departureDelayType === "late" ? "var(--dark-grey)" : "white"}
          backgroundColor={getTimelinessColor(
            departureDelayType,
            "var(--light-green)"
          )}>
          {departureDiff.sign === "-" ? "-" : ""}
          {departureDiff.hours ? doubleDigit(departureDiff.hours) + ":" : ""}
          {doubleDigit(get(departureDiff, "minutes", 0))}:
          {doubleDigit(get(departureDiff, "seconds", 0))}
        </ColoredBackgroundSlot>
        <PlainSlotSmall>{getNormalTime(stopDepartureTime)}</PlainSlotSmall>
      </TagButton>
    );

    let observedArrivalTime = null;

    if (firstTerminal) {
      observedArrivalTime = (
        <CalculateTerminalTime
          date={date}
          departure={stop.departure}
          event={arrivalEvent}>
          {({offsetTime, wasLate, diffHours, diffMinutes, diffSeconds, sign}) => (
            <>
              <StopArrivalTime onClick={this.onClickTime(stopArrivalTime)}>
                <PlainSlot
                  style={{
                    fontStyle: "italic",
                    fontSize: "0.925rem",
                    lineHeight: "1.2rem",
                  }}>
                  {offsetTime.format("HH:mm:ss")}*
                </PlainSlot>
                <ColoredBackgroundSlot
                  color="white"
                  backgroundColor={wasLate ? "var(--red)" : "var(--light-green)"}>
                  {sign === "-" ? "-" : ""}
                  {diffHours ? doubleDigit(diffHours) + ":" : ""}
                  {doubleDigit(diffMinutes)}:{doubleDigit(diffSeconds)}
                </ColoredBackgroundSlot>
                <PlainSlotSmall>{getNormalTime(stopArrivalTime)}</PlainSlotSmall>
              </StopArrivalTime>
              <SmallText>
                * <Text>journey.departure_minus_terminal</Text>
              </SmallText>
            </>
          )}
        </CalculateTerminalTime>
      );
    } else if (lastTerminal) {
      observedArrivalTime = (
        <CalculateTerminalTime
          recovery={true}
          date={date}
          departure={stop.departure}
          event={arrivalEvent}>
          {({offsetTime, wasLate, diffHours, diffMinutes, diffSeconds, sign}) => (
            <StopArrivalTime onClick={this.onClickTime(stopArrivalTime)}>
              <PlainSlot>{offsetTime.format("HH:mm:ss")}</PlainSlot>
              <ColoredBackgroundSlot
                color="white"
                backgroundColor={wasLate ? "var(--red)" : "var(--light-green)"}>
                {sign === "-" ? "-" : ""}
                {diffHours ? doubleDigit(diffHours) + ":" : ""}
                {doubleDigit(diffMinutes)}:{doubleDigit(diffSeconds)}
              </ColoredBackgroundSlot>
              <PlainSlotSmall>{getNormalTime(stopArrivalTime)}</PlainSlotSmall>
            </StopArrivalTime>
          )}
        </CalculateTerminalTime>
      );
    } else {
      observedArrivalTime = (
        <StopArrivalTime onClick={this.onClickTime(stopArrivalTime)}>
          <PlainSlot>{plannedArrivalMoment.format("HH:mm:ss")}</PlainSlot>
          <ColoredBackgroundSlot
            color="var(--dark-grey)"
            backgroundColor="var(--lighter-grey)">
            {arrivalDiff.sign === "-" ? "-" : ""}
            {arrivalDiff.hours ? doubleDigit(arrivalDiff.hours) + ":" : ""}
            {doubleDigit(get(arrivalDiff, "minutes", 0))}:
            {doubleDigit(get(arrivalDiff, "seconds", 0))}
          </ColoredBackgroundSlot>
          <PlainSlotSmall>{getNormalTime(stopArrivalTime)}</PlainSlotSmall>
        </StopArrivalTime>
      );
    }

    const stopPopup = (
      <Popup
        maxHeight={750}
        maxWidth={500}
        autoPan={true}
        key={`stop${stop.stopId}_popup`}>
        <PopupStopContent>
          <StopHeading>
            <strong>{stop.nameFi}</strong> {stop.stopId} (
            {stop.shortId.replace(/ /g, "")})
          </StopHeading>

          {(isTerminal || doorDidOpen) && arrivalEvent ? (
            <>
              <TimeHeading>
                <Text>journey.arrival</Text>
              </TimeHeading>
              {observedArrivalTime}
            </>
          ) : !doorDidOpen ? (
            <PopupParagraph>
              <Text>map.stops.doors_not_open</Text>
            </PopupParagraph>
          ) : null}

          {!lastTerminal && (
            <DepartureTimeGroup>
              <TimeHeading>
                <Text>journey.departure</Text>
              </TimeHeading>
              {observedDepartureTime}
            </DepartureTimeGroup>
          )}

          {plannedDuration > 0 && observedDuration > 0 && (
            <>
              <TimeHeading>
                <Text>journey.duration</Text>
              </TimeHeading>
              <TagButton>
                <PlainSlot>{secondsToTime(plannedDuration)}</PlainSlot>
                <ColoredBackgroundSlot
                  color="var(--dark-grey)"
                  backgroundColor="var(--lighter-grey)">
                  {durationDiffSign}
                  {durationDiff.hours ? doubleDigit(durationDiff.hours) + ":" : ""}
                  {doubleDigit(get(durationDiff, "minutes", 0))}:
                  {doubleDigit(get(durationDiff, "seconds", 0))}
                </ColoredBackgroundSlot>
                <PlainSlotSmall>{secondsToTime(observedDuration)}</PlainSlotSmall>
              </TagButton>
            </>
          )}
        </PopupStopContent>
        <button onClick={this.onShowStreetView}>
          <Text>map.stops.show_in_streetview</Text>
        </button>
      </Popup>
    );

    stopTooltip = (
      <Tooltip key={`stop${stop.stopId}_tooltip`}>
        <StopHeading>
          <strong>{stop.nameFi}</strong> {stop.stopId} (
          {stop.shortId.replace(/ /g, "")})
        </StopHeading>
        {!doorDidOpen && (
          <TooltipParagraph>
            <Text>map.stops.doors_not_open</Text>
          </TooltipParagraph>
        )}
        {lastTerminal ? (
          <>
            <TimeHeading>
              <Text>journey.arrival</Text>
            </TimeHeading>
            {observedArrivalTime}
          </>
        ) : (
          <>
            <TimeHeading>
              <Text>journey.departure</Text>
            </TimeHeading>
            {observedDepartureTime}
          </>
        )}
      </Tooltip>
    );

    markerChildren = [stopTooltip, stopPopup];

    return this.createStopMarker(
      delayType,
      color,
      isTerminal,
      markerChildren,
      doorDidOpen
    );
  }
}

export default RouteStopMarker;
