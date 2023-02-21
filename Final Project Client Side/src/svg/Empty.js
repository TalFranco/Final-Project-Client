import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Empty = (props) => (
    <Svg
        width={188}
        height={188}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={94} cy={94} r={94} fill="#F1F1F1" />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M114.473 132.099c.366.117.748.177 1.132.177l39.221-.003c2.916 0 5.281-3.459 5.281-7.727 0-4.268-2.365-7.727-5.281-7.727H150.3c-2.916 0-5.28-3.461-5.28-7.728 0-4.267 2.364-7.727 5.28-7.727h14.339c2.916 0 5.28-3.459 5.28-7.727 0-4.268-2.364-7.728-5.28-7.728h-16.595c2.916 0 5.28-3.459 5.28-7.727 0-4.268-2.364-7.727-5.28-7.727H99.768c2.916 0 5.28-3.461 5.28-7.728 0-4.267-2.364-7.727-5.28-7.727h-43c-2.916 0-5.281 3.461-5.281 7.729 0 4.268 2.365 7.728 5.281 7.728H26.6c-2.916 0-5.281 3.459-5.281 7.727 0 4.268 2.365 7.727 5.281 7.727h18.853c2.916 0 5.28 3.461 5.28 7.728 0 4.267-2.364 7.727-5.28 7.727H15.281c-2.916 0-5.281 3.458-5.281 7.727s2.365 7.729 5.281 7.729H44.7c-2.916 0-5.281 3.459-5.281 7.727 0 4.268 2.365 7.727 5.281 7.727h68.642c.384 0 .765-.06 1.131-.177Zm52.486-19.291a7.728 7.728 0 0 0-4.771 7.14v.001a7.729 7.729 0 1 0 4.771-7.141Z"
            fill="#fff"
        />
        <Path
            d="m53.94 81.61 6.037 51.5a6.667 6.667 0 0 0 6.621 5.89h41.477a6.664 6.664 0 0 0 6.62-5.885L121 79H68.002M121.723 55.722l-71.67 13.333a3.334 3.334 0 0 0-2.655 3.94l1.797 9.495 78.228-14.517-1.818-9.605a3.332 3.332 0 0 0-3.882-2.646Z"
            stroke="#000"
            strokeWidth={2}
            strokeMiterlimit={10}
        />
        <Path
            d="m100.45 59.68-1.51-7.978a3.334 3.334 0 0 0-3.887-2.645l-20 3.333a3.33 3.33 0 0 0-2.655 3.938l1.567 8.279"
            stroke="#000"
            strokeWidth={2}
            strokeMiterlimit={10}
        />
        <Path
            d="M59 72.333h-3.333v3.334H59v-3.334ZM65.667 70.667h-3.334V74h3.334v-3.333ZM72.333 69H69v3.333h3.333V69Z"
            fill="#000"
        />
        <Path
            d="M87.333 89v41.667M99.587 120.385l2.716-31.253M98.713 130.445l.539-6.2M75.08 120.385l-2.717-31.253M75.953 130.445l-.538-6.2M131.263 73.057l10.552-4.794M131.438 78.115 138.333 85"
            stroke="#000"
            strokeWidth={2}
            strokeMiterlimit={10}
        />
    </Svg>
);

export default Empty;
