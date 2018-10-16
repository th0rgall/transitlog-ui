import React from "react";
import {Svg, Path, G} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 96 96"
      preserveAspectRatio="xMidYMid meet">
      <G fill={fill} id="icon_time" fillRule="evenodd">
        <Path
          d="M48.469,17.72 C51.118,17.72 53.273,19.874 53.273,22.523 L53.273,45.641 L64.085,51.511 C66.412,52.775 67.278,55.698 66.018,58.025 C65.175,59.576 63.554,60.538 61.792,60.538 C60.998,60.538 60.206,60.336 59.501,59.956 L46.196,52.709 C44.664,51.914 43.67,50.286 43.669,48.497 L43.669,22.523 C43.669,19.874 45.819,17.72 48.469,17.72 Z M48.47,95.999 C22.277,95.999 0.969,74.688 0.969,48.497 C0.969,36.826 5.237,25.646 13.004,16.917 L9.181,11.408 C8.639,10.626 8.555,9.608 8.96,8.748 C9.365,7.888 10.204,7.304 11.151,7.227 L31.752,5.515 C31.8,5.506 31.916,5.497 32.031,5.497 C32.866,5.497 33.665,5.928 34.166,6.651 C34.708,7.433 34.794,8.452 34.388,9.313 L25.573,28.005 C25.185,28.834 24.388,29.405 23.486,29.517 L23.362,29.529 C22.409,29.602 21.504,29.163 20.966,28.39 L18.686,25.102 C13.447,31.777 10.576,40.03 10.576,48.494 C10.576,69.391 27.575,86.389 48.471,86.389 C69.366,86.389 86.366,69.391 86.366,48.494 C86.366,27.6 69.366,10.6 48.471,10.6 C45.82,10.6 43.671,8.446 43.671,5.797 C43.671,3.148 45.82,0.995 48.471,0.995 C74.663,0.995 95.973,22.305 95.973,48.497 C95.973,74.688 74.662,95.999 48.47,95.999 Z"
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

Icon.displayName = "Icons.Time2";