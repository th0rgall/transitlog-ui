import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import {observer} from "mobx-react";

const linesQuery = gql`
  query LinesQuery($date: Date) {
    lines(includeLinesWithoutRoutes: false, date: $date) {
      id
      lineId
      name
      routesCount
      _matchScore
    }
  }
`;

const removeFerryFilter = (line) => line.lineId.substring(0, 4) !== "1019";

export default observer(({children, date}) => {
  return (
    <Query query={linesQuery} variables={{date}}>
      {({loading, error, data}) => {
        let lines = orderBy(get(data, "lines", []).filter(removeFerryFilter), "lineId");

        return children({
          loading,
          error,
          lines,
        });
      }}
    </Query>
  );
});
