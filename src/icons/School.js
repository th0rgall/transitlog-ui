import React from "react";
import {Svg, Path, G} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 283 283"
      preserveAspectRatio="xMidYMid meet">
      <G fill={fill} fillRule="nonzero">
        <Path d="M270.033,68.188L154.071,4.936c-7.693-4.195-16.988-4.195-24.681,0L13.427,68.188 C5.149,72.703-0.002,81.381-0.002,90.812v177.974c0,7.116,5.769,12.885,12.885,12.885h257.695c7.116,0,12.885-5.769,12.885-12.885 V90.812C283.462,81.381,278.311,72.703,270.033,68.188z M66.568,234.51H36.505v-42.95h30.063V234.51z M66.568,158.727H36.505 v-42.948h30.063V158.727z M126.698,234.51H96.633v-42.95h30.065V234.51z M126.698,158.727H96.633v-42.948h30.065V158.727z M119.542,58.251c0-12.254,9.934-22.188,22.188-22.188s22.188,9.934,22.188,22.188s-9.934,22.187-22.188,22.187 S119.542,70.505,119.542,58.251z M186.827,234.51h-30.065v-42.95h30.065V234.51z M186.827,158.727h-30.065v-42.948h30.065V158.727z M246.955,234.51h-30.063v-42.95h30.063V234.51z M246.955,158.727h-30.063v-42.948h30.063V158.727z" />
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.School";
