import {getJourneyObject} from "./getJourneyObject";

const getJourneyId = (journey = null, matchVehicle = true) => {
  if (!journey) {
    return "";
  }

  if (typeof journey === "string" || journey.id) {
    const idStr = journey.id || journey;
    // If we don't want to match the vehicle, strip the vehicle id part from the ID if it exists.
    // The regex removes the part of the ID after the last _ if it contains a /.
    return !matchVehicle ? idStr.replace(/_(?=.*\/.*)([^_]*)$/g, "") : idStr;
  }

  let journeyItem = journey;

  if (typeof journey.oday === "string") {
    journeyItem = getJourneyObject(journey);
  }

  return getJourneyIdFromJourney(journeyItem, matchVehicle);
};

const getJourneyIdFromJourney = (journey = {}, matchVehicle = true) => {
  let {
    departureDate = null,
    departureTime = null,
    routeId = null,
    direction = null,
    uniqueVehicleId = null,
  } = journey;

  if (
    !routeId ||
    !departureDate ||
    !departureTime ||
    (matchVehicle && !uniqueVehicleId)
  ) {
    return "";
  }

  if (!matchVehicle) {
    return `${departureDate}_${departureTime}_${routeId}_${direction}`;
  }

  return `${departureDate}_${departureTime}_${routeId}_${direction}_${uniqueVehicleId}`;
};

export default getJourneyId;
