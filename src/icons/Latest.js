import React from "react";
import {Svg, Circle, G, Path} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="-4 -4 40 40"
      version="1.1"
      preserveAspectRatio="xMidYMid meet">
      <G fill={fill}>
        <Circle id="Oval" cx="4.32171607" cy="27.6316142" r="4.2786642" />
        <Path
          d="M3.16315944,11.9645766 C1.54410153,11.9645766 0.231403814,13.2768899 0.231403814,14.8959478 C0.231403814,16.5153901 1.54410153,17.8277034 3.16315944,17.8277034 C9.2815224,17.8277034 14.2586263,22.8055762 14.2586263,28.9231703 C14.2586263,30.5426126 15.5709397,31.854926 17.1907664,31.854926 C18.8098243,31.854926 20.122522,30.5426126 20.122522,28.9231703 C20.122522,19.5724574 12.5142567,11.9645766 3.16315944,11.9645766 Z"
          id="Shape"
        />
        <Path
          d="M3.07398056,0.256773667 C1.45530704,0.256773667 0.142224935,1.56947138 0.142224935,3.18852929 C0.142224935,4.8075872 1.45453826,6.12028492 3.07398056,6.12028492 C15.6466648,6.12066931 25.8760972,16.3501017 25.8760972,28.9231703 C25.8760972,30.5426126 27.1887949,31.854926 28.8082372,31.854926 C30.4269107,31.854926 31.7396085,30.5426126 31.7396085,28.9231703 C31.7396085,13.1177517 18.8805523,0.257926842 3.07398056,0.256773667 Z"
          id="Shape"
        />
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.Latest";
