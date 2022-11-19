import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2.127A3.873 3.873 0 0 0 6.127 6v4.167a.294.294 0 0 1-.588 0V6a4.46 4.46 0 1 1 8.922 0v4.167a.294.294 0 0 1-.588 0V6A3.873 3.873 0 0 0 10 2.127Z"
      {...props}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.206 10.167c0-.163.132-.294.294-.294h15c.162 0 .294.131.294.294v10a.294.294 0 0 1-.294.294h-15a.294.294 0 0 1-.294-.294v-10Zm.588.294v9.412h14.412V10.46H2.794Z"
      {...props}
    />
  </Svg>
)

export default SvgComponent