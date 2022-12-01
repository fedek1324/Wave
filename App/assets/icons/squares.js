import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={23}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      opacity={0.4}
      clipRule="evenodd"
      d="M15.785 1h3.267A2.46 2.46 0 0 1 21.5 3.47v3.294c0 1.363-1.096 2.47-2.448 2.47h-3.267a2.46 2.46 0 0 1-2.449-2.47V3.47A2.46 2.46 0 0 1 15.786 1Z"
      stroke="#0A84FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M3.949 1h3.265a2.46 2.46 0 0 1 2.45 2.47v3.294a2.46 2.46 0 0 1-2.45 2.47H3.95A2.46 2.46 0 0 1 1.5 6.764V3.47A2.46 2.46 0 0 1 3.949 1ZM3.949 12.766h3.265a2.46 2.46 0 0 1 2.45 2.47v3.294A2.46 2.46 0 0 1 7.213 21H3.95A2.46 2.46 0 0 1 1.5 18.53v-3.293a2.46 2.46 0 0 1 2.449-2.471ZM15.785 12.766h3.267c1.352 0 2.448 1.105 2.448 2.47v3.294A2.46 2.46 0 0 1 19.052 21h-3.267a2.46 2.46 0 0 1-2.449-2.47v-3.293a2.46 2.46 0 0 1 2.45-2.471Z"
      stroke="#007AFF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
