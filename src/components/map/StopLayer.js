import React from "react";
import {observer} from "mobx-react-lite";
import StopsByBboxQuery from "../../queries/StopsByBboxQuery";
import StopMarker from "./StopMarker";
import {latLng} from "leaflet";
import CompoundStopMarker from "./CompoundStopMarker";

const StopLayer = observer(({bounds, date, onViewLocation, showRadius}) => {
  const bbox = bounds
    ? {
        minLat: bounds.getSouth(),
        minLon: bounds.getWest(),
        maxLat: bounds.getNorth(),
        maxLon: bounds.getEast(),
      }
    : {};

  console.log(bounds);

  return (
    <StopsByBboxQuery skip={!bounds} variables={{...bbox, date}}>
      {({stops}) => {
        console.log(stops);

        const stopAreas = stops.reduce((groups, stop) => {
          const pos = latLng(stop.lat, stop.lon);
          let groupBounds;

          if (groups.size !== 0) {
            const groupEntries = groups.entries();
            for (const [area] of groupEntries) {
              if (area.contains(pos)) {
                groupBounds = area;
                break;
              }
            }
          }

          if (!groupBounds) {
            groupBounds = pos.toBounds(3);
          }

          const stopGroup = groups.get(groupBounds) || [];
          stopGroup.push(stop);

          return groups.set(groupBounds, stopGroup);
        }, new Map());

        return Array.from(stopAreas.entries()).map(([bounds, stopCluster]) => {
          return stopCluster.length === 1 ? (
            <StopMarker
              showRadius={showRadius}
              onViewLocation={onViewLocation}
              key={`stops_${stopCluster[0].stopId}`}
              stop={stopCluster[0]}
            />
          ) : (
            <CompoundStopMarker
              bounds={bounds}
              showRadius={showRadius}
              onViewLocation={onViewLocation}
              key={`stopcluster_${bounds.toBBoxString()}`}
              stops={stopCluster}
            />
          );
        });
      }}
    </StopsByBboxQuery>
  );
});

export default StopLayer;
