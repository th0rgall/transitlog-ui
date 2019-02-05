import React from "react";
import {withApollo} from "react-apollo";
import {fetchSingleRoute} from "../queries/SingleRouteQuery";
import {observer, inject} from "mobx-react";
import {app} from "mobx-app";
import get from "lodash/get";
import compact from "lodash/compact";
import {autorun} from "mobx";

function shouldFetch(route) {
  if (!get(route, "routeId", null)) {
    return false;
  }

  const requiredParts = [
    get(route, "routeId", ""),
    get(route, "direction", ""),
    get(route, "dateBegin", ""),
    get(route, "dateEnd", ""),
    get(route, "originstopId", ""),
  ];

  const presentParts = compact(requiredParts).length;

  // RouteId and direction are required for fetching, so we shouldFetch
  // if we have at least two parts but less than all parts present.
  return presentParts >= 2 && presentParts !== 5;
}

/*
  The component fetches the route and puts it into
 */

export default (Component) => {
  @inject(app("Filters"))
  @withApollo
  @observer
  class WithRouteComponent extends React.Component {
    disposeReaction = () => {};

    componentDidMount() {
      this.disposeReaction = autorun(() => {
        const {route} = this.props.state;
        if (shouldFetch(route)) {
          this.updateRoute(route);
        }
      });
    }

    componentWillUnmount() {
      this.disposeReaction();
    }

    updateRoute = async (route) => {
      const {
        client,
        Filters,
        state: {date},
      } = this.props;

      const fetchedRoute = await fetchSingleRoute(route, date, client);
      const stateRoute = this.props.state.route;

      if (
        shouldFetch(stateRoute) &&
        fetchedRoute &&
        stateRoute.routeId === fetchedRoute.routeId
      ) {
        Filters.setRoute(fetchedRoute);
      }
    };

    render() {
      const {
        state: {route},
      } = this.props;

      return <Component {...this.props} route={route} />;
    }
  }

  return WithRouteComponent;
};
