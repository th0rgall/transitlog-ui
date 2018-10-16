import React from "react";
import {Svg, Path, Rect} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";
import {Colors} from "./HSL_COLORS";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 59 44"
      preserveAspectRatio="xMidYMid meet">
      <Path
        fill={fill && fill.outer ? fill.outer : fill}
        d="M6.973,12.341 C6.973,11.641 6.973,10.891 7.023,10.191 L7.323,10.191 L11.873,14.791 C11.823,14.791 11.723,14.841 11.673,14.891 C11.623,14.741 11.523,14.641 11.423,14.541 L11.423,14.491 C11.173,14.291 10.923,14.191 10.673,14.191 C10.173,14.191 9.823,14.491 9.823,14.991 C9.823,15.341 10.173,15.891 10.573,15.991 L10.423,16.541 L9.973,16.441 C9.473,16.441 9.073,16.791 9.073,17.241 C9.073,17.741 9.573,18.191 10.223,18.191 C10.373,18.191 10.523,18.191 10.673,18.091 L11.073,18.691 L10.773,18.941 C10.673,19.091 10.623,19.291 10.623,19.491 C10.623,19.941 11.123,20.491 11.723,20.491 C11.973,20.491 12.223,20.391 12.373,20.141 L12.373,20.091 C12.423,19.991 12.473,19.891 12.473,19.791 L13.173,20.041 C13.173,20.791 13.923,21.491 14.473,21.491 C14.773,21.491 15.073,21.241 15.073,20.891 C15.073,20.741 15.023,20.591 14.973,20.391 L14.723,19.991 L15.123,19.791 C15.273,19.941 15.423,20.091 15.523,20.141 L15.523,20.191 C15.823,20.391 16.123,20.491 16.423,20.491 C16.773,20.491 16.973,20.291 16.973,19.891 L27.773,30.641 L11.123,30.641 C8.473,25.941 6.973,20.441 6.973,12.341 Z M3.223,0.641 L21.173,0.641 L21.173,9.041 L11.623,9.041 L10.973,8.441 C11.023,8.341 11.023,8.291 11.023,8.191 C11.023,7.641 10.573,7.241 9.923,7.241 L9.823,7.241 L9.373,6.841 C9.823,6.641 10.023,6.191 10.073,5.891 C10.073,5.341 9.673,4.941 9.173,4.941 C8.873,4.941 8.573,5.041 8.373,5.291 L8.123,5.591 L7.723,5.191 L7.773,5.041 C7.773,4.391 7.323,3.941 6.823,3.941 C6.723,3.941 6.623,3.941 6.523,3.991 L3.223,0.641 Z M25.323,19.591 C25.223,19.341 24.923,19.091 24.673,19.091 L21.673,19.091 L20.473,17.891 L24.273,17.891 C24.473,17.891 24.723,17.641 24.723,17.441 C24.723,17.141 24.423,16.791 24.123,16.791 L19.373,16.791 L12.773,10.191 L26.373,10.191 C26.323,10.891 26.323,11.641 26.323,12.341 C26.323,17.391 27.373,22.541 29.273,26.691 L22.723,20.141 L24.973,20.141 C25.173,20.141 25.373,20.041 25.373,19.841 C25.373,19.741 25.323,19.691 25.323,19.591 Z M5.773,12.341 C5.773,16.241 6.073,20.891 6.823,23.141 L0.673,23.141 L0.673,3.541 L4.173,7.041 L4.073,7.291 C3.873,7.241 3.723,7.241 3.673,7.241 C3.023,7.241 2.573,7.641 2.573,8.191 C2.573,8.691 3.023,9.091 3.673,9.091 C3.723,9.091 3.873,9.091 4.073,9.041 L4.273,9.491 C3.723,9.791 3.573,10.191 3.573,10.591 C3.573,11.041 4.023,11.441 4.423,11.441 C4.773,11.441 5.323,11.191 5.473,10.691 L5.823,10.841 C5.823,11.341 5.773,11.841 5.773,12.341 Z M15.023,18.841 C14.523,19.091 14.223,19.191 13.773,19.441 L12.073,18.841 C11.623,18.241 11.423,17.941 11.073,17.341 C11.273,16.441 11.223,15.941 12.523,15.391 L15.123,17.991 C15.073,18.241 15.023,18.491 15.023,18.841 Z M18.473,15.391 C18.573,15.491 18.723,15.541 18.823,15.541 L24.023,15.541 C24.273,15.541 24.523,15.291 24.523,15.041 C24.523,14.741 24.323,14.491 24.023,14.491 L18.873,14.491 C18.573,14.491 18.323,14.741 18.323,14.991 C18.323,15.141 18.373,15.291 18.473,15.391 Z M12.723,7.441 C12.723,7.691 12.923,7.891 13.173,7.891 L18.023,7.891 C18.273,7.891 18.473,7.691 18.473,7.441 C18.473,7.191 18.273,6.991 18.023,6.991 L13.173,6.991 C12.923,6.991 12.723,7.191 12.723,7.441 Z M12.723,5.491 C12.723,5.741 12.923,5.941 13.173,5.941 L18.023,5.941 C18.273,5.941 18.473,5.741 18.473,5.491 C18.473,5.241 18.273,5.041 18.023,5.041 L13.173,5.041 C12.923,5.041 12.723,5.241 12.723,5.491 Z M5.873,9.991 L5.273,9.741 L4.623,8.191 L4.823,7.691 L6.373,9.241 C6.123,9.441 5.923,9.691 5.873,9.991 Z M9.323,5.641 C9.373,5.691 9.373,5.741 9.373,5.791 C9.373,5.941 9.273,6.291 8.823,6.291 L8.673,6.141 C8.673,5.741 9.123,5.591 9.173,5.591 C9.223,5.591 9.273,5.591 9.323,5.641 Z M4.323,10.691 C4.273,10.641 4.273,10.591 4.273,10.541 C4.273,10.441 4.323,10.091 4.773,10.091 C4.823,10.091 4.923,10.041 4.923,10.191 C4.923,10.641 4.523,10.741 4.423,10.741 C4.373,10.741 4.373,10.741 4.323,10.691 Z M3.673,7.941 C3.673,7.941 3.973,7.941 4.123,8.191 C3.973,8.391 3.673,8.441 3.673,8.441 C3.423,8.441 3.273,8.291 3.273,8.191 C3.273,8.041 3.423,7.941 3.673,7.941 Z M10.923,14.991 L10.923,15.041 L11.073,15.341 C11.073,15.341 11.073,15.391 11.023,15.391 L10.973,15.391 C10.673,15.391 10.523,15.041 10.523,14.941 L10.523,14.891 C10.573,14.841 10.573,14.841 10.623,14.841 C10.673,14.841 10.773,14.891 10.923,14.991 Z M11.723,19.291 L11.773,19.341 L11.773,19.591 C11.623,19.741 11.673,19.841 11.473,19.841 L11.423,19.791 C11.373,19.791 11.323,19.641 11.323,19.641 C11.323,19.541 11.373,19.491 11.423,19.441 L11.423,19.391 C11.473,19.391 11.573,19.291 11.673,19.291 L11.723,19.291 Z M15.623,19.291 L15.673,19.291 C15.773,19.291 15.923,19.391 16.023,19.391 L16.023,19.441 C16.173,19.541 16.273,19.641 16.273,19.741 L16.273,19.791 C16.273,19.791 16.273,19.841 16.223,19.841 C16.173,19.841 15.973,19.741 15.873,19.691 L15.873,19.641 C15.773,19.591 15.673,19.491 15.623,19.341 L15.623,19.291 Z M14.273,20.441 C14.323,20.591 14.323,20.691 14.323,20.741 C14.323,20.791 14.273,20.791 14.273,20.791 C14.223,20.791 14.223,20.791 14.123,20.741 L13.923,20.441 C13.923,20.391 13.873,20.341 13.873,20.241 C13.873,20.241 13.923,20.191 13.923,20.141 L14.023,20.141 C14.173,20.241 14.273,20.441 14.273,20.441 Z M10.023,17.191 L10.073,17.191 C10.123,17.191 10.323,17.191 10.423,17.341 C10.423,17.341 10.323,17.491 10.223,17.491 L10.123,17.491 C9.723,17.491 9.723,17.391 9.723,17.341 C9.723,17.241 9.873,17.191 10.023,17.191 Z"
        id="tickets"
      />
      <Rect
        fill={fill && fill.outer ? fill.outer : fill}
        x="17.5"
        y="24.5"
        width="41"
        height="19"
        rx="3"
      />
      <Rect
        fill={fill && fill.inner ? fill.inner : Colors.primary.hslWhite}
        x="18.5"
        y="25.5"
        width="39"
        height="17"
        rx="2.3"
      />
      <Path
        fill={fill && fill.outer ? fill.outer : fill}
        d="M26.725,39.15 C24.43,39.15 22.72,37.95 22.72,36.135 L22.72,36.105 C22.72,34.845 23.425,34.05 24.61,33.555 C23.725,33.09 23.08,32.385 23.08,31.215 L23.08,31.185 C23.08,29.58 24.625,28.35 26.725,28.35 C28.825,28.35 30.37,29.565 30.37,31.185 L30.37,31.215 C30.37,32.385 29.725,33.09 28.84,33.555 C29.995,34.08 30.73,34.83 30.73,36.075 L30.73,36.105 C30.73,37.98 29.02,39.15 26.725,39.15 Z M26.725,32.94 C27.805,32.94 28.6,32.295 28.6,31.395 L28.6,31.365 C28.6,30.555 27.85,29.895 26.725,29.895 C25.6,29.895 24.85,30.555 24.85,31.35 L24.85,31.38 C24.85,32.295 25.645,32.94 26.725,32.94 Z M26.725,37.605 C28.105,37.605 28.93,36.9 28.93,36.03 L28.93,36 C28.93,35.04 27.97,34.41 26.725,34.41 C25.48,34.41 24.535,35.04 24.535,36 L24.535,36.03 C24.535,36.885 25.345,37.605 26.725,37.605 Z M36.865,39.18 C34.105,39.18 32.305,36.78 32.305,33.78 L32.305,33.75 C32.305,30.75 34.135,28.32 36.895,28.32 C39.64,28.32 41.455,30.72 41.455,33.72 L41.455,33.75 C41.455,36.75 39.625,39.18 36.865,39.18 Z M36.895,37.515 C38.53,37.515 39.55,35.835 39.55,33.78 L39.55,33.75 C39.55,31.68 38.485,29.985 36.865,29.985 C35.245,29.985 34.21,31.635 34.21,33.72 L34.21,33.75 C34.21,35.82 35.26,37.515 36.895,37.515 Z M52.36,36.9 C52.36,36.45 51.985,36.09 51.535,36.09 C51.25,36.09 51.04,36.21 50.89,36.39 C50.32,37.095 49.735,37.53 48.835,37.53 C47.65,37.53 46.795,36.825 46.375,35.625 L49.075,35.625 C49.42,35.625 49.705,35.34 49.705,34.98 C49.705,34.635 49.42,34.335 49.075,34.335 L46.105,34.335 C46.09,34.14 46.09,33.945 46.09,33.735 C46.09,33.51 46.09,33.285 46.12,33.075 L49.075,33.075 C49.42,33.075 49.705,32.79 49.705,32.445 C49.705,32.085 49.42,31.8 49.075,31.8 L46.405,31.8 C46.825,30.675 47.635,29.97 48.715,29.97 C49.645,29.97 50.23,30.345 50.8,31.035 C50.92,31.185 51.13,31.335 51.445,31.335 C51.925,31.335 52.33,30.945 52.33,30.465 C52.33,30.195 52.21,29.97 52.09,29.85 C51.31,28.95 50.35,28.32 48.76,28.32 C46.63,28.32 45.085,29.775 44.5,31.8 L43.66,31.8 C43.3,31.8 43.015,32.085 43.015,32.445 C43.015,32.79 43.3,33.075 43.66,33.075 L44.26,33.075 C44.23,33.3 44.23,33.54 44.23,33.765 C44.23,33.96 44.23,34.155 44.245,34.335 L43.66,34.335 C43.3,34.335 43.015,34.635 43.015,34.98 C43.015,35.34 43.3,35.625 43.66,35.625 L44.47,35.625 C45.04,37.755 46.6,39.18 48.82,39.18 C50.365,39.18 51.37,38.475 52.18,37.425 C52.27,37.32 52.36,37.125 52.36,36.9 Z"
        id="80€"
      />
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      inner: PropTypes.string,
      outer: PropTypes.string,
    }),
  ]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Icon.displayName = "Icons.Fines";