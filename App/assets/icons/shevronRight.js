import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M6.116 19.592a1 1 0 0 0 0 1.413l.983.982a1 1 0 0 0 1.414 0l8.78-8.78a1 1 0 0 0 0-1.414l-8.78-8.78a1 1 0 0 0-1.414 0l-.983.982a1 1 0 0 0 0 1.413l6.37 6.386a1 1 0 0 1 0 1.412l-6.37 6.386Z"
      fill="#007AFF"
      {...props}
    />
  </Svg>
)

export default SvgComponent
