import React, {Component} from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import {Query} from "react-apollo";
import isWithinRange from "date-fns/is_within_range";
import gql from "graphql-tag";
import getDay from "date-fns/get_day";
import get from "lodash/get";
import reduce from "lodash/reduce";

const departuresQuery = gql`
  query allDepartures(
    $routeId: String
    $direction: String
    $dayType: String
    $stopId: String
    $dateBegin: Date
    $dateEnd: Date
    $departureId: Int
    $limit: Int
  ) {
    allDepartures(
      first: $limit
      orderBy: [HOURS_ASC, MINUTES_ASC, DEPARTURE_ID_ASC]
      condition: {
        routeId: $routeId
        direction: $direction
        stopId: $stopId
        dateBegin: $dateBegin
        dateEnd: $dateEnd
        departureId: $departureId
        dayType: $dayType
      }
    ) {
      nodes {
        stopId
        dayType
        hours
        minutes
        dateBegin
        dateEnd
        routeId
        direction
        departureId
      }
    }
  }
`;

const dayTypes = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];

@observer
class DeparturesQuery extends Component {
  static propTypes = {
    route: PropTypes.shape({
      routeId: PropTypes.string,
      direction: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      originstopId: PropTypes.string,
    }),
    date: PropTypes.string.isRequired,
    stop: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        stopId: PropTypes.string,
      }),
    ]),
    departureId: PropTypes.number,
    dateBegin: PropTypes.string,
    dateEnd: PropTypes.string,
    limit: PropTypes.number,
    skip: PropTypes.bool,
  };

  static defaultProps = {
    route: {
      routeId: "",
      direction: "",
    },
    stop: {
      stopId: "",
    },
  };

  render() {
    const {
      route,
      stop,
      date,
      dateBegin,
      dateEnd,
      departureId,
      limit,
      children,
      skip,
    } = this.props;

    const queryDayType = dayTypes[getDay(date)];

    const {routeId = "", direction = "", originstopId = ""} = route;
    const stopId = get(stop, "stopId", stop);

    let queryVars = reduce(
      {
        dayType: queryDayType,
        stopId: originstopId ? originstopId : stopId,
        routeId,
        direction: direction,
        departureId,
        dateBegin,
        dateEnd,
        limit,
      },
      (presentVars, value, key) => {
        if (value) {
          presentVars[key] = value;
        }

        return presentVars;
      },
      {}
    );

    if (Object.keys(queryVars).length < 2) {
      // If we don't have the required info, return an empty array to the render function.
      return children({departures: [], loading: false, error: null});
    }

    return (
      <Query query={departuresQuery} variables={queryVars} skip={skip}>
        {({loading, error, data}) => {
          if (loading || error) {
            return children({departures: [], loading, error});
          }

          let departures = get(data, "allDepartures.nodes", []);

          // If the query was not constrained by dateBegin or dateEnd, do that here.
          if (!dateBegin || !dateEnd) {
            departures = departures.filter(({dateBegin, dateEnd}) => {
              return isWithinRange(date, dateBegin, dateEnd);
            });
          }

          return children({departures, loading: false, error: null});
        }}
      </Query>
    );
  }
}

export default DeparturesQuery;