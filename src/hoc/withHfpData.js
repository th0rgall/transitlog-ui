import {inject, observer} from "mobx-react";
import {app} from "mobx-app";
import React from "react";
import withRoute from "./withRoute";
import {fetchHfpJourney, loadCache, persistCache} from "../helpers/hfpQueryManager";
import {observable, reaction, action, runInAction} from "mobx";
import {journeyFetchStates} from "../stores/JourneyStore";
import getJourneyId from "../helpers/getJourneyId";
import orderBy from "lodash/orderBy";
import uniqBy from "lodash/uniqBy";
import get from "lodash/get";
import pAll from "p-all";
import {createFetchKey} from "../helpers/keys";

export default (Component) => {
  @inject(app("Journey", "Filters"))
  @withRoute
  @observer
  class WithHfpData extends React.Component {
    @observable.shallow
    currentView = [];

    @observable
    loading = false;

    fetchReaction = () => {};
    vehicleFetchReaction = () => {};
    resetReaction = () => {};

    @action
    setLoading = (value = !this.loading) => {
      this.loading = value;
    };

    @action
    resetView = () => {
      this.currentView.clear();
    };

    fetchRequestedJourneys = async () => {
      const {
        state: {requestedJourneys = []},
      } = this.props;

      this.setLoading(true);

      const journeyPromises = requestedJourneys.map(
        (journeyRequest, index) => async () => {
          let waitForIdle = true;
          // Do the first fetch asap without waiting
          if (index === 0) {
            waitForIdle = false;
          }

          return this.fetchDeparture(journeyRequest, waitForIdle);
        }
      );

      await pAll(journeyPromises, {concurrency: 5});
      await this.onFetchCompleted();
    };

    fetchRequestedVehicleJourneys = async () => {
      const {
        route,
        state: {date, requestedVehicleJourneys = []},
      } = this.props;

      this.setLoading(true);

      const journeyPromises = requestedVehicleJourneys.map(
        (vehicleId) => async () => {
          this.fetchVehicleDeparture(route, date, vehicleId);
        }
      );

      await pAll(journeyPromises, {concurrency: 5});
      await this.onFetchCompleted();
    };

    fetchDeparture = async (journeyRequest, waitForIdle = true) => {
      const {route, date, time} = journeyRequest;
      const [journey] = await fetchHfpJourney(route, date, time, waitForIdle);

      const {
        Journey,
        Filters,
        state: {selectedJourney},
      } = this.props;

      Journey.removeJourneyRequest(journeyRequest);

      if (journey) {
        Journey.setJourneyFetchState(journey.journeyId, journeyFetchStates.RESOLVED);

        const nextView = orderBy(
          uniqBy([...this.currentView, journey], "journeyId"),
          ({journeyId}) => {
            const keyParts = journeyId.slice(8).split("_");
            return keyParts[1].replace(":", "");
          }
        );

        if (selectedJourney && getJourneyId(selectedJourney) === journey.journeyId) {
          const journeyVehicle = get(journey, "positions[0].unique_vehicle_id", "");

          if (journeyVehicle) {
            Filters.setVehicle(journeyVehicle);
          }
        }

        runInAction(() => this.currentView.replace(nextView));
      } else {
        Journey.setJourneyFetchState(
          getJourneyId(Journey.getJourneyFromStateAndTime(journeyRequest.time)),
          journeyFetchStates.NOTFOUND
        );
      }
    };

    fetchVehicleDeparture = async () => {
      // TODO: this
    };

    onFetchCompleted = async () => {
      this.setLoading(false);
      await persistCache();
    };

    onError = (err) => {
      // The error is per fetched journey, so some way to match errors
      // to requested times is necessary. TODO!
      console.log(err);
    };

    async componentDidMount() {
      const {
        state: {requestedJourneys, requestedVehicleJourneys, vehicle, date, route},
      } = this.props;

      await loadCache();

      const {routeId = ""} = route;

      this.fetchReaction = reaction(
        () => [requestedJourneys.length, date, routeId],
        () => this.fetchRequestedJourneys(),
        {fireImmediately: true}
      );

      this.vehicleFetchReaction = reaction(
        () => [requestedVehicleJourneys.length, date, routeId, vehicle],
        () => this.fetchRequestedVehicleJourneys(),
        {fireImmediately: true}
      );

      // Reset the view if the fetchKey (without time) changes.
      this.resetReaction = reaction(
        () => createFetchKey(route, date, true),
        (fetchKey) => {
          console.log(fetchKey);
          this.resetView();
        },
        {fireImmediately: true}
      );
    }

    componentWillUnmount() {
      if (typeof this.fetchReaction === "function") {
        this.fetchReaction();
      }

      if (typeof this.vehicleFetchReaction === "function") {
        this.vehicleFetchReaction();
      }

      if (typeof this.resetReaction === "function") {
        this.resetReaction();
      }
    }

    render() {
      return (
        <Component
          key="withHfpDataComponent"
          {...this.props}
          loading={this.loading}
          positions={this.currentView}
        />
      );
    }
  }

  return WithHfpData;
};
