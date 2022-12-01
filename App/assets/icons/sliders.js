import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={21}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      opacity={0.4}
      d="M8.617 15.987H1.383"
      stroke="#0A84FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M19.618 15.986a2.88 2.88 0 1 1-5.76 0 2.88 2.88 0 0 1 5.76 0Z"
      stroke="#007AFF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      opacity={0.4}
      d="M12.383 4.262h7.235"
      stroke="#0A84FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M1.383 4.262a2.88 2.88 0 1 0 5.76 0 2.88 2.88 0 1 0-5.76 0Z"
      stroke="#007AFF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
