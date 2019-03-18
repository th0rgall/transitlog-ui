import React, {useCallback, useRef, useEffect, useState} from "react";
import get from "lodash/get";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {createHfpItem} from "../helpers/createHfpItem";
import {observer} from "mobx-react";
import getJourneyId from "../helpers/getJourneyId";
import {removeUpdateListener, setUpdateListener} from "../stores/UpdateManager";
import {getServerClient} from "../api";

export const routeJourneysQuery = gql`
  query routeJourneysQuery(
    $routeId: String!
    $direction: Direction!
    $date: Date!
    $stopId: String!
  ) {
    departures(
      filter: {routeId: $routeId, direction: $direction}
      date: $date
      stopId: $stopId
    ) {
      id
      index
      isNextDay
      isTimingStop
      dayType
      departureId
      equipmentColor
      equipmentType
      extraDeparture
      operatorId
      terminalTime
      recoveryTime
      routeId
      direction
      stopId
      plannedArrivalTime {
        arrivalDate
        arrivalDateTime
        arrivalTime
        isNextDay
      }
      observedArrivalTime {
        arrivalDate
        arrivalDateTime
        arrivalTime
        arrivalTimeDifference
        doorDidOpen
      }
      plannedDepartureTime {
        departureDate
        departureDateTime
        departureTime
        isNextDay
      }
      observedDepartureTime {
        departureDate
        departureDateTime
        departureTime
        departureTimeDifference
      }
    }
  }
`;

const updateListenerName = "journey list query";

const client = getServerClient();

const JourneysByDateQuery = observer(({children, route, date, skip}) => {
  const [refetchRef, setRefetchRef] = useState(null);

  const refetcher = useCallback(() => {
    const {routeId, direction, originStopId} = route;

    if (refetchRef && route && route.routeId && !skip) {
      refetchRef({
        routeId,
        direction: parseInt(direction, 10),
        stopId: originStopId,
        date,
      });
    }
  }, [route, date, refetchRef]);

  useEffect(() => setUpdateListener(updateListenerName, refetcher, false), [refetcher]);

  const {routeId, direction, originstopId} = route;

  return (
    <Query
      client={client}
      query={routeJourneysQuery}
      variables={{
        routeId: routeId,
        direction: parseInt(direction, 10),
        stopId: originstopId,
        date,
      }}>
      {({data, error, loading, refetch}) => {
        console.log(loading);
        if (!data || loading) {
          return children({departures: [], loading, error});
        }

        const departures = get(data, "departures", []);

        if (refetchRef !== refetch) {
          setRefetchRef(refetch);
        }

        return children({departures, loading, error});
      }}
    </Query>
  );
});

export default JourneysByDateQuery;