import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={20}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M11.952 21c.688 0 1.175-.592 1.528-1.508l6.253-16.334c.171-.44.267-.831.267-1.156C20 1.382 19.618 1 18.998 1c-.325 0-.716.095-1.155.267L1.422 7.558C.62 7.864 0 8.351 0 9.048c0 .878.668 1.174 1.585 1.45l5.155 1.566c.61.191.955.172 1.365-.21L18.578 2.07c.124-.114.267-.095.362-.01.096.096.105.24-.01.363L9.185 12.933c-.373.392-.401.716-.22 1.356l1.518 5.04c.287.965.582 1.671 1.47 1.671Z"
      {...props}
    />
  </Svg>
)

export default SvgComponent