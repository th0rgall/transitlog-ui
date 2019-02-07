import React from "react";
import get from "lodash/get";
import {
  StopElementsWrapper,
  StopMarker,
  StopContent,
  StopWrapper,
  StopHeading,
  TimeHeading,
  StopArrivalTime,
} from "./elements";
import {PlainSlot, ColoredBackgroundSlot, PlainSlotSmall} from "../../TagButton";
import {transportColor} from "../../transportModes";
import doubleDigit from "../../../helpers/doubleDigit";
import CalculateTerminalTime from "./CalculateTerminalTime";
import {Text} from "../../../helpers/text";
import {departureTime, getNormalTime, journeyEventTime} from "../../../helpers/time";

export default ({
  stop,
  date,
  onClickTime,
  // The origin stop times are needed in other places too,
  // so we can get it here if it has already been calculated.
  arrivalTimes,
}) => {
  const stopMode = get(stop, "modes.nodes[0]", "BUS");
  const stopColor = get(transportColor, stopMode, "var(--light-grey)");

  // Bail here if we don't have data about stop arrival and departure times.
  if (!arrivalTimes) {
    return (
      <StopWrapper>
        <StopElementsWrapper color={stopColor} terminus="destination">
          <StopMarker color={stopColor} />
        </StopElementsWrapper>
        <StopContent>
          <StopHeading>
            <strong>{stop.nameFi}</strong> {stop.stopId} ({stop.shortId})
          </StopHeading>
        </StopContent>
      </StopWrapper>
    );
  }

  const {departure, arrivalEvent} = arrivalTimes;
  const stopArrivalTime = journeyEventTime(arrivalEvent);

  return (
    <StopWrapper>
      <StopElementsWrapper color={stopColor} terminus="destination">
        <StopMarker color={stopColor} />
      </StopElementsWrapper>
      <StopContent terminus="destination">
        <StopHeading>
          <strong>{stop.nameFi}</strong> {stop.stopId} ({stop.shortId})
        </StopHeading>
        <CalculateTerminalTime
          recovery={true}
          date={date}
          departure={departure}
          event={arrivalEvent}>
          {({offsetTime, wasLate, diffMinutes, diffSeconds, sign}) => (
            <>
              <TimeHeading>
                <Text>journey.arrival</Text>
              </TimeHeading>
              <StopArrivalTime onClick={onClickTime(stopArrivalTime)}>
                <PlainSlot>{offsetTime.format("HH:mm:ss")}</PlainSlot>
                <ColoredBackgroundSlot
                  color="white"
                  backgroundColor={wasLate ? "var(--red)" : "var(--light-green)"}>
                  {sign}
                  {doubleDigit(diffMinutes)}:{doubleDigit(diffSeconds)}
                </ColoredBackgroundSlot>
                <PlainSlotSmall>{getNormalTime(stopArrivalTime)}</PlainSlotSmall>
              </StopArrivalTime>
            </>
          )}
        </CalculateTerminalTime>
      </StopContent>
    </StopWrapper>
  );
};
