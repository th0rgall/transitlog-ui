import Metolib from "@fmidev/metolib";
import {FMI_APIKEY} from "../constants";
import moment from "moment-timezone";

const SERVER_URL = `https://data.fmi.fi/fmi-apikey/${FMI_APIKEY}/wfs`;
const STORED_QUERY_OBSERVATION = "fmi::observations::weather::multipointcoverage";

export async function getWeatherForArea(bbox, dateTime, setCancelCb = () => {}) {
  const endTime = dateTime.toDate();
  const startTime = dateTime.subtract(30, "minutes").toDate();

  return new Promise((resolve, reject) => {
    const connection = new Metolib.WfsConnection();
    if (connection.connect(SERVER_URL, STORED_QUERY_OBSERVATION)) {
      setCancelCb(() => connection.disconnect());

      connection.getData({
        requestParameter: "t2m,ws_10min,ri_10min,snow_aws,vis,n_man,wawa",
        begin: startTime,
        end: endTime,
        timestep: 10 * 60 * 1000,
        bbox: bbox,
        callback: function(data, errors) {
          connection.disconnect();

          if (errors.length !== 0) {
            reject(errors);
          } else {
            resolve(data);
          }
        },
      });
    } else {
      reject(["No connection"]);
    }
  });
}
