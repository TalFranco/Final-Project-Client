import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";

const BagHeader = (props) => (
  <View style={{ width: 19, height: 19, aspectRatio: 19 / 26 }}>
    <Svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 19 26">
      <Path
        d="m18.987 22.456-1.38-15.217a.813.813 0 0 0-.81-.739h-2.432V4.875A4.853 4.853 0 0 0 9.499 0C6.817 0 4.634 2.187 4.634 4.875V6.5H2.2a.81.81 0 0 0-.807.74L.014 22.455A3.246 3.246 0 0 0 3.243 26h12.512a3.246 3.246 0 0 0 3.231-3.544ZM6.256 4.875a3.25 3.25 0 0 1 5.541-2.303 3.23 3.23 0 0 1 .946 2.303V6.5H6.256V4.875Zm10.697 18.972c-.311.34-.736.528-1.198.528H3.244a1.6 1.6 0 0 1-1.197-.53 1.604 1.604 0 0 1-.417-1.243L2.942 8.125h1.692v2.438a.812.812 0 1 0 1.622 0V8.124h6.487v2.438a.812.812 0 1 0 1.622 0V8.124h1.691l1.314 14.479c.042.46-.105.902-.417 1.243Z"
        fill="black"
        stroke="black"
        strokeWidth={0.3}
      />
    </Svg>
  </View>
);

export default BagHeader;
