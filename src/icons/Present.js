import React from "react";
import {Svg, Path} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 36 36"
      version="1.1"
      preserveAspectRatio="xMidYMid meet">
      <Path
        fill={fill}
        d="M19.0465116,19.0588235 L33.6976744,19.0588235 L33.6976744,36 L19.0465116,36 L19.0465116,19.0588235 Z M2.30232558,19.0588235 L16.9534884,19.0588235 L16.9534884,36 L2.30232558,36 L2.30232558,19.0588235 Z M19.0465116,16.9411765 L19.0465116,10.5882353 L35.7906977,10.5882353 L35.7906977,16.9411765 L33.6976744,16.9411765 L19.0465116,16.9411765 Z M0.209302326,16.9411765 L0.209302326,10.5882353 L16.9534884,10.5882353 L16.9534884,16.9411765 L2.30232558,16.9411765 L0.209302326,16.9411765 Z M18,3.9888 C16.6332558,1.74451765 14.13,0 11.7209302,0 C9.41274419,0 7.53488372,1.89995294 7.53488372,4.23529412 C7.53488372,6.57063529 9.41274419,8.47058824 11.7209302,8.47058824 L24.2790698,8.47058824 C26.5872558,8.47058824 28.4651163,6.57063529 28.4651163,4.23529412 C28.4651163,1.89995294 26.5872558,0 24.2790698,0 C21.87,0 19.3667442,1.74451765 18,3.9888 Z M11.7209302,6.35294118 C10.5668372,6.35294118 9.62790698,5.40296471 9.62790698,4.23529412 C9.62790698,3.06762353 10.5668372,2.11764706 11.7209302,2.11764706 C13.774186,2.11764706 16.1506047,4.22470588 16.7885581,6.35294118 L11.7209302,6.35294118 Z M24.2790698,2.11764706 C25.4331628,2.11764706 26.372093,3.06762353 26.372093,4.23529412 C26.372093,5.40296471 25.4331628,6.35294118 24.2790698,6.35294118 L19.2114419,6.35294118 C19.8493953,4.22470588 22.225814,2.11764706 24.2790698,2.11764706 Z"
        id="present"
      />
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.Present";