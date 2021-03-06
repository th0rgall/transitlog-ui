import React from "react";
import flow from "lodash/flow";
import RouteStop from "./RouteStop";
import {observer} from "mobx-react-lite";
import StopsByRouteQuery from "../../queries/StopsByRouteQuery";
import {inject} from "../../helpers/inject";

const decorate = flow(
  observer,
  inject("state")
);

const RouteStopsLayer = decorate(
  ({
    state: {date, stop: selectedStop, highlightedStop, selectedJourney},
    route,
    onViewLocation,
    showRadius,
  }) => {
    return (
      <StopsByRouteQuery date={date} route={route} skip={!route}>
        {({stops}) => {
          return stops.map((stop, index, arr) => {
            const isFirst = index === 0;
            const isLast = index === arr.length - 1;

            const isSelected = stop.stopId === selectedStop;
            const isHighlighted = stop.stopId === highlightedStop;

            return (
              <RouteStop
                key={`stop_marker_${stop.stopId}_${stop.stopIndex}`}
                selected={isSelected}
                highlighted={isHighlighted}
                firstTerminal={isFirst}
                lastTerminal={isLast}
                selectedJourney={selectedJourney}
                firstStop={arr[0]}
                stop={stop}
                date={date}
                onViewLocation={onViewLocation}
                showRadius={showRadius}
              />
            );
          });
        }}
      </StopsByRouteQuery>
    );
  }
);

export default RouteStopsLayer;
