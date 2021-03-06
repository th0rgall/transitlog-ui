import get from "lodash/get";

const vehicleColors = {
  BUS: "var(--bus-blue)",
  TRAM: "var(--green)",
  RAIL: "var(--purple)",
  TRAIN: "var(--purple)",
  TRUNK: "var(--orange)",
  SUBWAY: "var(--orange)",
  default: "var(--blue)",
};

export function getModeColor(mode = "default") {
  return get(vehicleColors, mode, vehicleColors.default);
}

// If there are many modes, return the most significant one with explicit logic.
export function getPriorityMode(modes) {
  if (modes.indexOf("TRUNK") !== -1) {
    return "TRUNK";
  }

  if (modes.indexOf("TRAM") !== -1) {
    return "TRAM";
  }

  return modes[0];
}
